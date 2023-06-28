<script setup>
import { ref, reactive, computed } from 'vue';
import { useTodoStore } from '../stores/todo';
import Header from '../components/v-header.vue'
import Todo from '../components/v-todo.vue'

const todo = useTodoStore()
const filtro = ref('all')

const handleSubmit = () => {

    if (todo.tarea.texto === "") {
        alert('Ingresa una tarea')
        return
    }

    todo.addTodo()

}


const itemsLeft = computed(() => {
    const filterTareas = todo.tareas.filter(tarea => tarea.completed === false)
    return filterTareas.length
})

const textoTareas = computed(() => {
    const filterTareas = todo.tareas.filter(tarea => tarea.completed === false)
    if (filterTareas.length > 1) {
        return 'Tareas Restantes'
    } else {
        return 'Tarea Restante'
    }
})

const toggleFilters = () => {
    todo.filtrosTareas()
}

</script>

<template>
    <Header />
    <main class="-m-44 container max-w-5xl text-white w-full h-auto mx-auto px-7">
        <div class="flex justify-between items-center">
            <h1 class="font-bold tracking-[.80rem] text-2xl">TODO</h1>
            <img src="/icon-sun.svg" alt="Icono del sol" class="w-6 h-6">
        </div>
        <form @submit.prevent="handleSubmit">
            <div class="flex gap-3 bg-gray-800 rounded items-center mt-10 py-2">
                <span class="rounded-full border border-gray-700  w-6 h-5 ml-4"></span>
                <input class="w-full bg-gray-800 placeholder:text-gray-500 placeholder:text-sm outline-none" type="text"
                    placeholder="Crear Tarea..." v-model="todo.tarea.texto">
            </div>
        </form>

        <div v-if="!todo.tareas.length" class="bg-gray-800 rounded items-center mt-5 p-5">
            <p class="text-center text-gray-400 text-xl">No hay tareas. Empieza creando tu primera Tarea</p>
        </div>

        <div v-else class="bg-gray-800 rounded items-center mt-5">
            <Todo v-for="todo in todo.tareas" :key="todo.id" :todo="todo" />
            <div class="flex justify-between py-3 mx-10 text-gray-500">
                <p>{{ itemsLeft }} {{ textoTareas }}</p>
                <button type="button" @click="todo.deleteCompleteTodos">Eliminar Completadas</button>
            </div>
        </div>

        <div v-if="todo.tareas.length" class="bg-gray-800 rounded items-center mt-5">
            <div class="">
                <form class="flex justify-around py-3 text-gray-500" @submit.prevent="toggleFilters">
                    <button @click="toggleFilters">All</button>
                </form>
            </div>
        </div>
    </main>
</template>
