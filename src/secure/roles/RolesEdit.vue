<template>
    <div v-if="loading" class="loading-overlay">
         <div class="loader"></div>
    </div>
    <form @submit.prevent="submit">
        <div class="form-group row">
            <label for="name" class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" name="name" id="name" v-model="name"/>
            </div>
        </div>

        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Permissions</label>
             <div class="col-sm-10">
               <div class="form-check form-check-inline col-3" v-for="permission in permissions" :key="permission.id">
                 <input class="form-check-input" type="checkbox" :value="permission.id"
                 :checked="checked(permission.id)"
                  @change="select(permission.id , $event.target.checked)" />
                 <label class="form-check-label">{{ permission.name }}</label>
              </div>
         </div> 
        </div>
        <button class="btn btn-outline-secondary"> Save</button>
    </form>
</template>
<script setup lang="ts">

import { Role } from '@/classes/Role';
import axios from 'axios';
import { ref , onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const {params} = useRoute();

const router = useRouter();
const name = ref('');
const loading = ref(false);
const permissions = ref([]);
const selected = ref([] as number[]);
onMounted(async()=>{
    loading.value = true;
    const response = await axios.get('permissions');
    permissions.value = response.data.data ;
    const roleCall=await axios.get(`roles/${params.id}`);
    console.log(roleCall.data.data)
    const role : Role = roleCall.data.data; 
    name.value=role.name;
    selected.value = role.permissions.map(p=>p.id);
    loading.value = false;
})


const select = (id:number , checked: boolean) => {
    if(checked){
        selected.value = [...selected.value, id];
        return;
    }
    selected.value = selected.value.filter(s=>s !== id);
}
const checked = (id:number) => selected.value.some(s=>s===id)
const submit = async () =>{
    loading.value = true;
    await axios.put(`roles/${params.id}` , {
        name:name.value ,
        permissions : selected.value
    });
   await router.push('/roles')
   loading.value = false;
}
</script>