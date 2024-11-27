<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput></TodoInput>
    <TodoList :todo-array="todoItems"></TodoList>
    <TodoFooter></TodoFooter>
  </div>

</template>

<script>
import { reactive, onBeforeMount } from "vue"

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

    return { todoItems };
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
