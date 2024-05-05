<template>
<div v-if="loading" class="loading-overlay">
     <div class="loader"></div>
</div>
<h2 class="mt-4">Account Information </h2>
 <form @submit.prevent="submitInfo">
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
    <br>
    <button class="btn btn-outline-secondary">Update</button>
</form>
<h2 class="mt-4"> Change Password</h2>
 <form @submit.prevent="submitPassword">
    <div class="form-group">
        <label >Password</label>
        <input type="password" class="form-control" name="password" v-model="password">
    </div>
    <div class="form-group">
        <label >Password Confirm</label>
        <input type="password" class="form-control" name="password_confirm" v-model="password_confirm">
    </div>
    <br>
    <button class="btn btn-outline-secondary">Update</button>
</form>
</template>
<script setup lang="ts">
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import Swal from 'sweetalert2';
import { useStore } from "vuex";
import { User } from "@/classes/user";

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const loading = ref(false);
const store = useStore();
const password = ref('');
const password_confirm =ref('')
  onMounted(async()=>{
        loading.value = true ;
        //const response = await axios.get('user');
        //const user = response.data.data ;
        const user = computed(()=>store.state.User.user)
        firstName.value = user.value.first_name;
        lastName.value = user.value.last_name;
        email.value = user.value.email;
        loading.value = false ;
        
       });

      const  submitInfo = async () => {
       loading.value = true ;
       const response = await axios.put('users/info' , {
            first_name : firstName.value ,
             last_name : lastName.value , 
            email :email.value
        });
        const u : User = response.data;
        store.dispatch('User/setUser',new User(
            u.id,
            u.first_name,
            u.last_name,
            u.email,
            u.role,
            u.permissions
            ));
        loading.value = false ;
        Swal.fire({
             icon: 'success',
             title: 'Success',
            text: 'Profile Updated successfully!',
             });
      }
      const  submitPassword = async () => {
       loading.value = true ;
       await axios.put('users/password' , {
            password : password.value ,
             password_confirm : password_confirm.value , 
         
        });
        loading.value = false ;
        Swal.fire({
             icon: 'success',
             title: 'Success',
            text: 'Password changed successfully!',
             });
        password.value = '';
        password_confirm.value='';
      }
</script>