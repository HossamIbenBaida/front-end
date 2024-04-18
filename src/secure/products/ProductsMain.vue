<template>
    <div v-if="loading" class="loading-overlay">
         <div class="loader"></div>
    </div>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3 border-bottom">
      <div class="btn-toolbar mb2 mb-md-0">
        <router-link to="/products/create" class="btn btn-sm btn-outline-secondary" >Add</router-link>
      </div>
    </div>
    <div v-show="!loading" class="table-responsive">
         <table class="tb table table-striped table-sm">
           <thead>
             <tr>
               <th>#</th>
               <th>Image</th>
               <th>Title</th>
               <th>Description</th>
               <th>Price</th>
               <th>Action</th>
             </tr>
           </thead>
           <tbody>
             <tr v-for="product in products" :key="product.id" >
                <td>#</td>
               <td><img :src="product.image" height="50"/></td>
               <td>{{ product.title}}</td>
               <td>{{ product.description}}</td>
               <td>{{ product.price}}$</td>
               <td>
                <div class="btn-group mr-2">
                  <router-link  :to="`/products/${product.id}/edit`" class="btn btn-sm btn-outline-secondary">Edit</router-link>
                  <a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary" @click="del(product.id)" >Delete</a>
               </div>
               </td>
             </tr>
           </tbody>
         </table>
       </div>
       <paginator-section :lastpage="lastpage" :loading="loading" @page-changed="load($event)"/>
</template>

<script setup lang="ts">

import { Entity } from "@/interfaces/entity";
import PaginatorSection from '@/secure/components/PaginatorSection.vue';
import axios from "axios";
import { onMounted, ref } from "vue";
const products = ref([]);
const loading = ref(false);
const lastpage = ref(0);

const load = async (page:number) =>{
   loading.value = true;
   const response = await axios.get(`products?page=${page}`);
   products.value = response.data.data ;
   lastpage.value = response.data.meta.last_page;
   console.log(response.data.data);
   loading.value = false;
   
}


onMounted(load);



const del = async(id : number) => {
if(confirm('Are you sure you want to delete this record ? ')){
 loading.value=true;
 await axios.delete(`products/${id}`);
 products.value = products.value.filter((e : Entity)=> e.id !== id);
 loading.value=false;

}
}
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
  backdrop-filter: blur(5px); /* Apply blur effect */
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader {
  width: 60px;
  aspect-ratio: 2;
  --_g: no-repeat radial-gradient(circle closest-side,#000 90%,#0000);
  background: 
    var(--_g) 0%   50%,
    var(--_g) 50%  50%,
    var(--_g) 100% 50%;
  background-size: calc(100%/3) 50%;
  animation: l3 1s infinite linear;
}
@keyframes l3 {
    20%{background-position:0%   0%, 50%  50%,100%  50%}
    40%{background-position:0% 100%, 50%   0%,100%  50%}
    60%{background-position:0%  50%, 50% 100%,100%   0%}
    80%{background-position:0%  50%, 50%  50%,100% 100%}
}

</style>