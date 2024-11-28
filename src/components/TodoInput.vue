<template>
    <div class="inputBox shadow">
        <input type="text" :value="newTodoItem" @input="handleInput" @keyup.enter="addTodo" ref="myinput">
        <!-- <input type="text" v-model="newTodoItem"> -->
        <!-- <button @click="addTodo">추가</button> -->
        <span class="addContainer" @click="addTodo">
            <i class="fas fa-plus addBtn"></i>
        </span>
        <MyModal v-if="showModal" @close="showModal = false">
            <template v-slot:header>
                <h3>
                    경고!
                    <i class="closeModalBtn fas fa-times" @click="showModal = false"></i>
                </h3>
            </template>
            <template v-slot:body>
                <div>아무것도 입력하지 않으셨습니다.</div>
            </template>
        </MyModal>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import MyModal from '@/components/common/MyModal.vue'
import { useStore } from "vuex"

const store = useStore()

const showModal = ref(false)

const newTodoItem = ref("")
const myinput = ref(null)

//사용자정의 Event를 선언함
const emit = defineEmits(["input:todo"])

//Life Cycle Hook 호출
onMounted(() => {
    myinput.value.focus()
})

const handleInput = (event) => {
    const todoText = event.target.value
    if (!todoText) return
    //사용자정의 Event를 발생시킨다
    emit("input:todo", todoText)
    newTodoItem.value = todoText
}

const addTodo = () => {
    const todoItem = newTodoItem.value
    if (todoItem !== "") {
        //store.commit("addTodo", todoItem)
        const todoObj = { completed: false, item: todoItem }
        store.dispatch("moduleTodo/addTodo", todoObj)
        clearInput();
    } else {
        showModal.value = !showModal.value
    }
}

const clearInput = () => {
    newTodoItem.value = ""
}
</script>

<style scoped>
input:focus {
    outline: none;
}

.inputBox {
    background: white;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
}

.inputBox input {
    border-style: none;
    font-size: 0.9rem;
    width: 80%;
}

.addContainer {
    float: right;
    background: linear-gradient(to right, #6478FB, #8763FB);
    display: block;
    width: 3rem;
    border-radius: 0 5px 5px 0;
}

.addBtn {
    color: white;
    vertical-align: middle;
}

.closeModalBtn {
    color: #42b983;
}
</style>