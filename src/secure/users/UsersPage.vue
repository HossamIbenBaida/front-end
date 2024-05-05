<template>
    <div v-if="loading" class="loading-overlay">
         <div class="loader"></div>
    </div>
    <div v-if="AuthUser.canEdit('users')" class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3 border-bottom">
      <div class="btn-toolbar mb2 mb-md-0">
        <router-link  to="/users/create" class="btn btn-sm btn-outline-secondary" >Add</router-link>
      </div>
    </div>
    <div v-show="!loading" class="table-responsive">
         <table class="tb table table-striped table-sm">
           <thead>
             <tr>
               <th>#</th>
               <th>Name</th>
               <th>Email</th>
               <th>Role</th>
               <th>Action</th>
             </tr>
           </thead>
           <tbody>
             <tr v-for="user in users" :key="user.id">
               <td>{{ user.id}}</td>
               <td>{{ user.first_name}} {{ user.last_name}}</td>
               <td>{{ user.email}}</td>
               <td>{{ user.role.name}}</td>
               <td  >
                <div class="btn-group mr-2" v-if="AuthUser.canEdit('users')">
                  <router-link  :to="`/users/${user.id}/edit`" class="btn btn-sm btn-outline-secondary">Edit</router-link>
                  <a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary" @click="del(user.id)">Delete</a>
               </div>
               </td>
             </tr>
           </tbody>
         </table>
       </div>
       <paginator-section :lastpage="lastpage" :loading="loading" @page-changed="load($event)"/>
</template>
<script setup lang="ts">
import axios from 'axios';
import { ref , onMounted, computed } from 'vue';
import {Entity} from '@/interfaces/entity'
import PaginatorSection from '@/secure/components/PaginatorSection.vue';
import { useStore } from 'vuex';
const users = ref(null);
const loading = ref(false);
const lastpage = ref(0);
const store = useStore();
const AuthUser = computed(()=>store.state.User.user);
const load = async (page:number)=> {
    loading.value=true
    const response = await axios.get(`users?page=${page}`);
    users.value  = response.data.data;
    lastpage.value = response.data.meta.last_page;
    console.log( response.data.meta.last_page)
    loading.value=false
}

onMounted(load);

const del = async(id : number)=>{
 if(confirm('Are you sure you want to delete this record ? ')){
     loading.value=true
     await axios.delete(`users/${id}`);
     //users.value = users.value.filter((e : Entity)=> e.id !== id);
     await load();
     loading.value=false
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