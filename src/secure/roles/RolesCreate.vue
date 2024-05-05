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
                 <input class="form-check-input" type="checkbox" :value="permission.id" @change="select(permission.id , $event.target.checked)" />
                 <label class="form-check-label">{{ permission.name }}</label>
              </div>
         </div> 
        </div>
        <button class="btn btn-outline-secondary"> Save</button>
    </form>
</template>
<script setup lang="ts">

import axios from 'axios';
import { ref , onMounted } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();
const name = ref('');
const loading = ref(false);
const permissions = ref([]);
const selected = ref([] as number[]);

onMounted(async()=>{
    loading.value = true;
    const response = await axios.get('permissions');
    permissions.value = response.data.data ;
    loading.value = false;
})

const select = (id:number , checked: boolean) => {
    if(checked){
        selected.value = [...selected.value, id];
        return;
    }
    selected.value = selected.value.filter(s=>s !== id);
}

const submit = async () => {
//     loading.value = true;
//     const requestBody = {
//         name: name.value,
//         permissions: selected.value
//     };
//     console.log(requestBody);

//     await axios.post('roles', requestBody);
//     loading.value = false;
//     await router.push('/roles');
if (!name.value.trim()) {
        console.error('Name field is required.');
        return;
    }

if (selected.value.length === 0) {
        console.error('Please select at least one permission.');
        return;
 }
  loading.value = true;
    const requestBody = {
        name: name.value,
        permissions: selected.value
    };
    try {
        const response = await axios.post('roles', requestBody);
        console.log('Role created successfully:', response.data);
        await router.push('/roles');
    } catch (error) {
        console.error('Error creating role:', error.response ? error.response.data : error.message);
    } finally {
        loading.value = false;
    }
};
</script>