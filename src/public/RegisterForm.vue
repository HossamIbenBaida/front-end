<template>
  <main-menu/>
<form class="form-signin" @submit.prevent="submit">
  <h1 class="h3 mb-3 font-weight-normal">Please register</h1>

  <label for="first_name" class="sr-only">First name</label>
  <input type="text" id="first_name" class="form-control" placeholder="First name" required v-model="firstName" >
  
  <label for="last_name" class="sr-only">Last name</label>
  <input type="text" id="last_name" class="form-control" placeholder="Last name" required v-model="lastName" >
  
  <label for="inputEmail" class="sr-only">Email address</label>
  <input type="email" id="email" class="form-control" placeholder="Email address" required v-model="email" >

  <label for="Password" class="sr-only">Password</label>
  <input type="password" id="inputPassword" class="form-control" placeholder="Password" required v-model="password">
  
  <label for="passwordConfirm" class="sr-only">Password Confirm</label>
  <input type="password" id="passwordConfirm" class="form-control" v-model="passwordConfirm" placeholder="Password" required>
  
  <button class="btn btn-lg btn-primary btn-block" type="submit" >register</button>
 
</form>
</template>
<script setup >
 import {ref} from 'vue' ;
 import axios from 'axios' ;
 import { useRouter } from 'vue-router';

 const firstName = ref('');
 const lastName = ref('');
 const email = ref('');
 const password = ref('');
 const passwordConfirm = ref('');
 const router = useRouter();

const submit = async ()=>{
  await axios.post("register",{
  first_name :firstName.value , 
  last_name : lastName.value,
  email : email.value ,
  password : password.value,
  password_confirm : passwordConfirm.value
});
await router.push('/login')

}

</script>
<style scoped>
 .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
      html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

</style>