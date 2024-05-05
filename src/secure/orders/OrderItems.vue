<template>
<div v-if="loading" class="loading-overlay">
         <div class="loader"></div>
    </div>
    <div v-show="!loading" class="table-responsive">
         <table class="tb table table-striped table-sm">
           <thead>
             <tr>
               <th>#</th>
               <th> Product Title</th>
               <th>Quantity</th>
               <th>Price</th>
             </tr>
           </thead>
           <tbody>
             <tr v-for="orderItem in orderItems" :key="orderItem.id" >
               <td>{{orderItem.id}}</td>
               <td>{{orderItem.title}}</td>
               <td>{{orderItem.quantity}}</td>
               <td>{{orderItem.price}}</td>
             </tr>
           </tbody>
         </table>
       </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import {onMounted, ref} from 'vue'
import axios from "axios";

const {params}= useRoute();
const orderItems = ref([]);
const loading = ref(false);
onMounted(async()=>{
 loading.value = true;
 const resopnse = await axios.get(`orders/${params.id}`);
 console.log(resopnse.data.data)
 orderItems.value = resopnse.data.data.order_items ;
 loading.value = false
})


</script>