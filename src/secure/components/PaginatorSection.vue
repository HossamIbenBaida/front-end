<template> 
   <nav v-show="!loading">
        <ul class="pagination">
            <li class="page-item">
                <a class="page-link" href="javascript:void(0)" @click="prev">Previous</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="javascript:void(0)" @click="next">Next</a>
            </li>
        </ul>
    </nav>
</template>
<script setup lang="ts">
import { ref , defineProps, getCurrentInstance} from "vue";
const props = defineProps({
    loading: Boolean,
    lastpage:Number

});
const { emit } = getCurrentInstance();
const page = ref(1);
const prev = async ()=>{
    if (page.value === 1) return;
    page.value--;   
    emit('page-changed', page.value)

}
const next = async ()=>{
    if (page.value === props.lastpage) return;
    page.value++;
    emit('page-changed', page.value)
}


</script>
