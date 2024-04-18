<template>
<div class="input-group-append">
            <input type="text" class="form-control" name="image" v-model="image">
            <label class="btn btn-primary">
                Upload <input type="file" hidden @change="change($event.target.files)"/>
     </label>
</div>
</template>
<script setup lang="ts">
import axios from "axios";
import { getCurrentInstance} from "vue";
const { emit } = getCurrentInstance();

const change = async (files : FileList)=>{
    const file= files.item(0);
    const data = new FormData;
    data.append('image',file);
    const response = await axios.post('upload' , data);
    console.log(response.data.url)
    emit('image-uploaded', response.data.url)
}

</script>