<template>
<div v-if="loading" class="loading-overlay">
     <div class="loader"></div>
    </div>
    <form @submit.prevent="submit">
    <div class="form-group">
        <label >Title</label>
        <input type="text" class="form-control" name="title" v-model="title">
    </div>
    <div class="form-group">
        <label >Description</label>
        <input type="text" class="form-control" name="description" v-model="description">
    </div>
    <div class="form-group">
        <label >Image</label>
        <input type="text" class="form-control" name="image" v-model="image" readonly>
        <image-upload @image-uploaded="changeImage($event)"></image-upload>
    </div>
    <div class="form-group">
        <label >Price</label>
        <input type="text" class="form-control" name="price" v-model="price">
    </div>
    <button class="btn btn-outline-secondary">Save</button>
</form>

</template>
<script setup lang="ts">
import ImageUpload from '@/secure/components/ImageUpload.vue';
import axios from "axios";
import { Product } from '@/classes/Product';
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const {params} = useRoute();
const title = ref('');
const description = ref('');
const image = ref('');
const price = ref(0);
const loading = ref(false);
const router = useRouter();
const changeImage = (im : string) => {
    console.log(im);
    image.value = im ;
}
onMounted(async()=>{
    loading.value = true;
    const response = await axios.get(`products/${params.id}`);
    const product : Product = response.data.data;
    title.value = product.title;
    description.value = product.description;
    image.value = product.image;
    price.value = product.price;
    loading.value = false ;
})

const submit = async() => {
    loading.value = true
    console.log( {
        title: title.value,
        description: description.value,
        image: image.value,
        price: price.value,
    });
    await axios.put(`products/${params.id}`, {
        title: title.value,
        description: description.value,
        image: image.value,
        price: price.value,
    });
    loading.value = false;
     await router.push('/products');
}


</script>