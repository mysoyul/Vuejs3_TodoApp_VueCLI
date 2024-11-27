<template>
    <div>
        <ul>
            <li v-for="(item, index) in todoItems" v-bind:key="index">
                {{ item }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
const todoItems = ref([])

//Life cycle Hook
onBeforeMount(() => {
    console.log('mounted in the composition api!')
    if (localStorage.length > 0) {
        for (var i = 0; i < localStorage.length; i++) {
            const storageKey = localStorage.key(i)
            if(storageKey !== '__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS_STATE__'){
                todoItems.value.push(localStorage.getItem(storageKey))
            }
        }
    }

})
</script>

<style scoped></style>