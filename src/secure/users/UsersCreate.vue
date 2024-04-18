<template>
    <div v-if="loading" class="loading-overlay">
     <div class="loader"></div>
    </div>
    <form @submit.prevent="submit">
    <div class="form-group">
        <label >First Name</label>
        <input type="text" class="form-control" name="first_name" v-model="firstName">
    </div>
    <div class="form-group">
        <label >Last Name</label>
        <input type="text" class="form-control" name="last_name" v-model="lastName">
    </div>
    <div class="form-group">
        <label >Email</label>
        <input type="text" class="form-control" name="email" v-model="email">
    </div>
    <div class="form-group">
        <label >Role</label>
        <select class="form-control" name="role_id" v-model="roleId">
            <option value="0">Select Role</option>
            <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
        </select>
    </div>
    <button class="btn btn-outline-secondary">Save</button>
</form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
  const firstName = ref('');
  const lastName = ref('');
  const email = ref('');
  const roleId = ref(0);
  const roles = ref([]);
  const router = useRouter();
  const loading = ref(false);
onMounted (async ()=> {
    loading.value = true;
    const response = await axios.get('roles');
    roles.value = response.data.data ;
    loading.value = false;
})

const submit = async()=>{
    loading.value = true;
 await axios.post('users', {
    first_name: firstName.value ,
    last_name:lastName.value,
    email:email.value,
    role_id:roleId.value
 });
 loading.value = false;
 await router.push('/users')
}


</script>

<style scoped>



</style>