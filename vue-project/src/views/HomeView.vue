<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useTodoStore } from '@/stores/todo'

const todoStore = useTodoStore()
const title = ref('')
let stopRealtime: null | (() => void) = null

onMounted(async () => {
  await todoStore.fetchTodos()
  // Optional realtime:
  stopRealtime = todoStore.startRealtime
})

onBeforeUnmount(() => {
  stopRealtime?.()
})

function onAdd() {
  todoStore.addTodo(title.value)
  title.value = ''
}
</script>

<template>
  <main>
    <h1>Todo App</h1>
    <form @submit.prevent="onAdd">
      <input type="text" v-model="title" placeholder="New todo" />
      <button>Add</button>
    </form>
    <div v-if="todoStore.loading">Loading...</div>
    <div v-if="todoStore.error">{{ todoStore.error }}</div>
    <ul>
      <li v-for="todo in todoStore.todos" :key="todo.id">
        <input
          type="checkbox"
          :checked="todo.is_done"
          @change="() => todoStore.toggleTodo(todo)"
        />
        <span :class="{ 'is-done': todo.is_done }">{{ todo.title }}</span>
        <button @click="() => todoStore.deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
  </main>
</template>

<style scoped>
.is-done {
  text-decoration: line-through;
}
</style>

