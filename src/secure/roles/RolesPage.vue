<template>
    <div v-if="loading" class="loading-overlay">
         <div class="loader"></div>
    </div>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3 border-bottom">
      <div class="btn-toolbar mb2 mb-md-0">
        <router-link to="/roles/create" class="btn btn-sm btn-outline-secondary" >Add Role</router-link>
      </div>
    </div>
    <div v-show="!loading" class="table-responsive">
         <table class="tb table table-striped table-sm">
           <thead>
             <tr>
               <th>#</th>
               <th>Name</th>
               <th>Action</th>
             </tr>
           </thead>
           <tbody>
             <tr v-for="role in roles" :key="role.id">
               <td>{{ role.id}}</td>
               <td>{{ role.name}}</td>

               <td>
                <div class="btn-group mr-2">
                  <router-link  :to="`/roles/${role.id}/edit`" class="btn btn-sm btn-outline-secondary">Edit</router-link>
                  <a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary" @click="del(role.id)">Delete</a>
               </div>
               </td>
             </tr>
           </tbody>
         </table>
       </div>
</template>
<script setup lang="ts">
import { Entity } from '@/interfaces/entity';
import axios from 'axios'; 
import { ref , onMounted } from 'vue';

const roles = ref([]);
const loading = ref(false);
onMounted(async ()=>{
 loading.value = true;
 const response = await axios.get('roles')
 roles.value = response.data.data;
 loading.value = false;
})
const del = async (id : number)=> {
    loading.value = true;
    if(confirm('Are you sure you want to delete this record ? ')){
    await axios.delete(`/roles/${id}`);
    roles.value = roles.value.filter((e : Entity)=> e.id !== id);
    loading.value = false;
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