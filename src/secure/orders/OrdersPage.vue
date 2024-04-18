<template>
<div v-if="loading" class="loading-overlay">
         <div class="loader"></div>
    </div>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3 border-bottom">
      <div class="btn-toolbar mb2 mb-md-0">
        <a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary" >Export</a>
      </div>
    </div>
    <div v-show="!loading" class="table-responsive">
         <table class="tb table table-striped table-sm">
           <thead>
             <tr>
               <th>#</th>
               <th>Name</th>
               <th>Email</th>
               <th>Total</th>
               <th>Action</th>
             </tr>
           </thead>
           <tbody>
             <tr v-for="order in orders" :key="order.id" >
                <td>{{ order.id }}</td>
               <td>{{ order.first_name }} {{ order.last_name }}</td>
               <td>{{ order.email }}</td>
               <td>{{ order.total }}</td>
               <td>
                <div class="btn-group mr-2">
                  <router-link  :to="`/orders/${order.id}/edit`" class="btn btn-sm btn-outline-secondary">View</router-link>
               </div>
               </td>
             </tr>
           </tbody>
         </table>
       </div>
       <paginator-section :lastpage="lastpage" :loading="loading" @page-changed="load($event)"/>

</template>
<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";
import PaginatorSection from '@/secure/components/PaginatorSection.vue';

const orders = ref([]);
const loading = ref(false);
const lastpage = ref(0);

const load = async (page)=>{
  loading.value = true;
  const response = await axios.get(`orders?page=${page}`);
  orders.value = response.data.data;
  lastpage.value = response.data.meta.last_page;
  console.log(orders.value);
  loading.value = false;
}

onMounted(load);




</script>