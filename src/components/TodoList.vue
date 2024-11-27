<template>
    <div>
        <ul>
            <li v-for="(todo, index) in todoItems" :key="index">
                <i class="fas fa-check checkBtn" :class="{checkBtnCompleted: todo.completed}"></i>
                <span :class="{textCompleted: todo.completed }">{{todo.item}}</span>
                <span class="removeBtn" @click="removeTodo(item, index)">
                    <i class="fas fa-trash-alt"></i>
                </span>
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
            if (storageKey !== '__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS_STATE__') {
                todoItems.value.push(JSON.parse(localStorage.getItem(storageKey)))
            }
        }
    }

})

const removeTodo = (todoItem, index) => {
    localStorage.removeItem(todoItem)
    todoItems.value.splice(index, 1)
}

</script>

<style scoped>
ul {
    list-style-type: none;
    padding-left: 0px;
    margin-top: 0;
    text-align: left;
}

li {
    display: flex;
    min-height: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0.5rem 0;
    padding: 0 0.9rem;
    background: white;
    border-radius: 5px;
}

.removeBtn {
    margin-left: auto;
    color: #de4343;
}

.checkBtn {
    line-height: 45px;
    color: #62acde;
    margin-right: 5px;
}

.checkBtnCompleted {
    color: #b3adad;
}

.textCompleted {
    text-decoration: line-through;
    color: #b3adad;
}
</style>