<script setup>
import { useTodoStore } from '../stores/todo';

const todo = useTodoStore()

    defineProps({
        filtro: {
            String,
        }
    })
</script>

<template>
    <button @click="todo.filtrosTareas(filtro)">{{ filtro }}</button>
</template>