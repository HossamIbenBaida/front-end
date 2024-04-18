<template>
 <div v-if="loading" class="loading-overlay">
         <div class="loader"></div>
</div>
<div class="input-group-append">        
    <label class="btn btn-primary">
                Upload <input type="file" hidden @change="change($event.target.files)"/>
     </label>
</div>
</template>
<script setup lang="ts">
import axios from "axios";
import { getCurrentInstance, ref} from "vue";
const { emit } = getCurrentInstance();
const loading = ref(false);
const change = async (files : FileList)=>{
    loading.value = true;
    const file= files.item(0);
    const data = new FormData;
    data.append('image',file);
    const response = await axios.post('upload' , data);
    console.log(response.data.url)
    loading.value=false
    emit('image-uploaded', response.data.url)
  
}

</script>