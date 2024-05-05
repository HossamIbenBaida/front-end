<template>
  <div v-if="loading" class="loading-overlay">
         <div class="loader"></div>
    </div>
  <h2 class="chart-title">Daily Sales</h2>

  <div id="chart" class="chart-container"></div>
</template>
<script setup>
import axios from 'axios';
import * as c3 from 'c3';
import { onMounted, ref } from 'vue';

const loading = ref(false);
onMounted(
  async ()=>{
    const chart = c3.generate({
      bindto:'#chart',
      data:{
        x:'x',
        columns: [
          ['x'],
          ['Sales']
        ] ,
        types : {
          Sales:'line'
        },
        colors: {
          Sales: '#3498db' // Change the color of the bars to blue
        }
      },
      axis:{
        x:{
          type:'timeseries',
          tick:{
            format:'%Y-%m-%d'
          },
          y: {
            max: 400,
            min: -400,
            // Range includes padding, set 0 if no padding needed
            // padding: {top:0, bottom:0}
        }
        }
      }
    });
    loading.value = true;
    const resopnse = await axios.get('chart');
    const records = resopnse.data.data;
    chart.load({
      columns: [
        ['x',...records.map(s=>s.date)],
        ['Sales',...records.map(s=>s.sum)]
      ]
      
    });
    loading.value = false;
  }
);



</script>
<style>
.c3-shape {
     fill: none;
 }
/* Loader Styles */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loader {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Chart Styles */
.chart-container {
  margin-top: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.chart-title {
  margin-bottom: 10px;
  color: #333;
  font-size: 24px;
  text-align: center;
}
</style>