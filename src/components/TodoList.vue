<template>
    <div>
        <div>TodoList</div>
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
            todoItems.value.push(storageKey)
        }
    }
    console.log(todoItems.value)
})
</script>

<style scoped></style>