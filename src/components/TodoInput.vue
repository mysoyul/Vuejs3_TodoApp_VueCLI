<template>
    <div>
        <input type="text" :value="newTodoItem" @input="handleInput">
        <!-- <input type="text" v-model="newTodoItem"> -->
        <button @click="addTodo">추가</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const newTodoItem = ref("")

//사용자정의 Event를 선언함
const emit = defineEmits(["input:todo"])

const handleInput = (event) => {
    const todoText = event.target.value
    if (!todoText) return
    //사용자정의 Event를 발생시킨다
    emit("input:todo", todoText)
    newTodoItem.value = todoText
}

const addTodo = () => {
    const todoItem = newTodoItem.value
    //Input 필드에서 입력한 값을 로컬스토리지에 저장하기
    localStorage.setItem(todoItem, todoItem)
    clearInput()
}

const clearInput = () => {
    newTodoItem.value = ""
}
</script>

<style scoped></style>