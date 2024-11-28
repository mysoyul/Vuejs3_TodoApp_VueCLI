<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput @add:todo="addTodo"></TodoInput>
    <TodoList :todo-array="todoItems" @remove:todo="removeTodo" @toggle:todo="toggleTodo"></TodoList>
    <TodoFooter @clear:todo="clearTodo"></TodoFooter>
  </div>

</template>

<script>
import { reactive } from "vue"

import TodoHeader from '@/components/TodoHeader.vue'
import TodoInput from '@/components/TodoInput.vue'
import TodoList from '@/components/TodoList.vue'
import TodoFooter from '@/components/TodoFooter.vue'

export default {
  name: 'App',
  components: {
    TodoHeader, TodoInput, TodoList, TodoFooter
  },
  setup() {
    const todoItems = reactive([])

    const addTodo = (todoItemStr) => {
      const todoItemObj = { completed: false, item: todoItemStr };
      //Input 필드에서 입력한 값을 로컬스토리지에 저장하기
      localStorage.setItem(todoItemStr, JSON.stringify(todoItemObj));
      todoItems.push(todoItemObj);
    } //addTodo

    const removeTodo = (todoItemStr, index) => {
      localStorage.removeItem(todoItemStr);
      todoItems.splice(index, 1);
    } //removeTodo

    const toggleTodo = (todo, index) => {
      const { completed, item } = todo
      todoItems[index].completed = !completed;
      localStorage.removeItem(item);
      localStorage.setItem(item, JSON.stringify(todoItems[index]));
    }

    const clearTodo = () => {
      localStorage.clear()
      todoItems.splice(0)
    }

    return { todoItems, addTodo, removeTodo, toggleTodo, clearTodo };
  }, //setup
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  text-align: center;
  background-color: #f6f6f6;
}

input {
  border-style: groove;
  width: 200px;
}

button {
  border-style: groove;
}

.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}

i,
span {
  cursor: pointer;
}
</style>
