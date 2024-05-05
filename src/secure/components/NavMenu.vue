<template>
  <div v-if="loading" class="loading-overlay">
     <div class="loader"></div>
    </div>
<nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
   <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" >Company name</a>

   <nav class="my-2 my-md-0 mr-md-3">
     <router-link to="/profile" class="p-2 text-white">{{ user?.name }}</router-link>
     <a class="p-2 text-white" href="javascript:void(0)" @click="logout">Sign out</a>
   </nav>
 </nav>
</template>
<script setup>
import axios from 'axios';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const loading = ref(false);

// Define props

//console.log(props.user.first_name);
// Access router inside the setup block
const router = useRouter();
const store = useStore();
const user = computed(()=>store.state.User.user);
// Define logout function
const logout = async () => {
  loading.value=true;
  //localStorage.clear();
  await axios.post('logout', {});
  loading.value=false;
  router.push('/login');
};
</script>