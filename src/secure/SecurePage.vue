<template >
  <div v-if="!user" class="loading-overlay">
    <div class="loader"></div>
  </div>
  
   <nav-menu  v-if="user" :user="user"/>
   <div class="container-fluid">
   <div class="row">
    <main-menu v-if="user"/>   
    <div  class="main-content">
     <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
       <router-view v-if="user" ></router-view>
     </main>
    </div>
   </div>
 </div> 
</template>

<script setup>
import MainMenu from '@/secure/components/MainMenu';
import NavMenu from '@/secure/components/NavMenu';

import axios from "axios";
import {onMounted , ref} from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const user = ref(null);

onMounted(async ()=>{
try {
  const response = await axios.get('user');
  //console.log(response.data.data);
  
    user.value = response.data.data ;
  //console.log(user.value.first_name)
  
 }catch(e){
  await router.push('/login')
 }
});
   

</script>
<style>
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