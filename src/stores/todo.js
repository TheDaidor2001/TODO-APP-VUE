import { defineStore } from "pinia";
import { uid } from "uid";
import { reactive, ref, watch, onMounted } from "vue";

export const useTodoStore = defineStore("todo", () => {
  const tareas = ref([]);
  const tareasFiltradas = ref([]);
  const filtros = ref(["All", "Active", "Completed"]);
  const tarea = reactive({
    texto: "",
    completed: false,
  });

  watch(
    tareas,
    () => {
      guardarLocalStorage();
      tareasFiltradas.value = tareas.value;
    },
    {
      deep: true,
    }
  );

  onMounted(() => {
    const tareasStorage = JSON.parse(localStorage.getItem("tareas"));

    if (tareasStorage) {
      tareas.value = tareasStorage;
      tareasFiltradas.value = tareasStorage;
    }
  });

  function guardarLocalStorage() {
    localStorage.setItem("tareas", JSON.stringify(tareas.value));
  }

  function addTodo() {
    const nuevo = Object.assign({}, tarea);
    nuevo.id = uid();
    tareas.value.push(nuevo);

    tarea.texto = "";
  }

  function deleteTodo(id) {
    tareas.value = tareas.value.filter((todo) => todo.id !== id);
  }

  function deleteCompleteTodos() {
    tareas.value = tareas.value.filter((todo) => !todo.completed);
  }

  function filtrosTareas(filtro) {
    if (filtro === "All") {
      return (tareasFiltradas.value = tareas.value);
    }

    if (filtro === "Active") {
      const tareasNoCompleted = tareas.value.filter((todo) => !todo.completed);
      return (tareasFiltradas.value = tareasNoCompleted);
    }

    if (filtro === "Completed") {
      const tareasCompleted = tareas.value.filter((todo) => todo.completed);
      return (tareasFiltradas.value = tareasCompleted);
    }
  }

  return {
    tareas,
    tarea,
    filtros,
    tareasFiltradas,
    addTodo,
    deleteTodo,
    deleteCompleteTodos,
    filtrosTareas,
  };
});
