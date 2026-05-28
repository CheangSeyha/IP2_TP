import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apolloClient } from '@/apolloClient'
import { GET_TODOS, ADD_TODO, TOGGLE_TODO, DELETE_TODO, TODOS_SUB } from '@/graphql/todos'

export interface Todo {
  id: string
  title: string
  is_done: boolean
  created_at: string
}

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchTodos() {
    loading.value = true
    error.value = null
    try {
      const { data } = await apolloClient.query<{ todos: Todo[] }>({
        query: GET_TODOS,
        fetchPolicy: 'network-only', // // keep it simple for students
      })
      todos.value = data.todos
    } catch (e: any) {
      error.value = e.message ?? 'Failed to load todos'
    } finally {
      loading.value = false
    }
  }

  async function addTodo(title: string) {
    const clean = title.trim()
    if (!clean) return

    await apolloClient.mutate({
      mutation: ADD_TODO,
      variables: { title: clean },
    })

    // // simplest approach for class:
    await fetchTodos()
  }

  async function toggleTodo(todo: Todo) {
    await apolloClient.mutate({
      mutation: TOGGLE_TODO,
      variables: { id: todo.id, is_done: !todo.is_done },
    })
    await fetchTodos()
  }

  async function deleteTodo(id: string) {
    await apolloClient.mutate({
      mutation: DELETE_TODO,
      variables: { id },
    })
    await fetchTodos()
  }

  let realtime: ZenObservable.Subscription | null = null
  function startRealtime() {
    if (realtime) return
    realtime = apolloClient
      .subscribe({
        query: TODOS_SUB,
      })
      .subscribe(({ data }) => {
        todos.value = data.todos
      })
  }

  function stopRealtime() {
    realtime?.unsubscribe()
    realtime = null
  }

  return {
    todos,
    loading,
    error,
    fetchTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    startRealtime,
    stopRealtime,
  }
})
