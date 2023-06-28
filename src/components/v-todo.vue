<script setup>
import { computed } from 'vue';
import { useTodoStore } from '../stores/todo';

const props = defineProps({
    todo: {
        type: Object,
        required: true
    }
})

const todoStore = useTodoStore()

const isCompleted = computed(() => {
    return props.todo.completed
})

const toogleCompleted = () => {
    props.todo.completed = !props.todo.completed
}


</script>

<template>
    <div class="flex justify-between py-4 items-center border-b border-gray-600 last:border-none">
        <div class="flex gap-3 items-center">
            
            <button v-if="isCompleted" @click="toogleCompleted" class="rounded-full border border-gray-700  w-5 h-5 ml-4 flex items-center justify-center bg-gradient-to-r from-cyan-300 to-purple-800">
                <img src="/icon-check.svg" alt="">
            </button>
            <button v-else  @click="toogleCompleted" class="rounded-full border border-gray-700  w-5 h-5 ml-4"></button>
            <p class="text-gray-300 text-sm" :class="[isCompleted && 'line-through']">{{ todo.texto }}</p>
        </div>
        <button class="mr-5" @click="todoStore.deleteTodo(todo.id)">
            <img src="/icon-cross.svg" alt="Cross image" class="w-4 h-4 ">
        </button>
    </div>
</template>