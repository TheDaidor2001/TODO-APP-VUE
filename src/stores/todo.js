import { defineStore } from "pinia";
import { uid } from "uid";
import { reactive, ref, watch, onMounted } from "vue";

export const useTodoStore = defineStore("todo", () => {
  const tareas = ref([]);
  const tareasFiltradas = ref([])
  const filtro = ref("all");
  const tarea = reactive({
    texto: "",
    completed: false,
  });

  watch(tareas, () => {
    guardarLocalStorage()
  }, {
    deep: true
  })


  onMounted(() => {
    const tareasStorage = JSON.parse(localStorage.getItem("tareas"));

    if(tareasStorage) {
      tareas.value = tareasStorage;
      tareasFiltradas.value = tareasStorage;
    }
  })

  

  function guardarLocalStorage() {
    localStorage.setItem("tareas", JSON.stringify(tareas.value));
  }  


  function addTodo() {
    const nuevo = Object.assign({}, tarea)
    nuevo.id = uid()
    tareas.value.push(nuevo)

    tarea.texto = ""
  }

  function deleteTodo(id) {
    tareas.value = tareas.value.filter((todo) => todo.id !== id); 
  }

  function deleteCompleteTodos () {
    tareas.value = tareas.value.filter((todo) => !todo.completed); 
  }

  function filtrosTareas(filtro) {
    switch (filtro) {
      case "all":
        tareasFiltradas.value = tareas.value;
        break;
      case "completed":
        tareasFiltradas.value = tareas.value.filter((todo) => todo.completed);
        break;
      case "notCompleted":
        tareasFiltradas.value = tareas.value.filter((todo) => !todo.completed);
        break;
      default:
        break;
    }
    
    this.filtro = filtro;
    
    console.log(this.filtro);
  }
  

  return {
    tareas,
    tarea,
    tareasFiltradas,
    addTodo,
    deleteTodo,
    deleteCompleteTodos,
    filtrosTareas
  };
});
