<template>
    <div>
        <h1>Lista de tareas</h1>
        
        <router-link :to="{name: 'agregar'}">
            <button class="bt btn-success btn-block">Add</button>
        </router-link>

        <form @submit.prevent="buscador(texto)">
            <input type="text" placeholder="Buscar tarea"
            class="form-control mt-5" v-model="texto" v-on:keyup="buscador(texto)">
        </form>

        <div v-if="load_" class="text-center mt-5">
            <h3>Cargando...</h3>
            <pulse-loader :loading="load_"></pulse-loader>
        </div>


         <ul class="list-group mt-5" v-if="!load_">
            <li class="list-group-item"
                v-for='tarea of arrayFiltered' :key="tarea.id" >
                {{ tarea.id }}   - {{ tarea.nombre }} 
                <div class="float-right">
                    <router-link class="btn btn-warning btn-sm mr-2"
                    :to="{name: 'editar', params:{ id: tarea.id}}">
                        Editar
                    </router-link>
                    <button @click="delTarea(tarea.id)" class="btn btn-danger btn-sm">Eliminar</button>
                </div>
            </li>
        </ul> 
    </div>
</template>

<script>
import {mapState, mapActions, mapGetters} from "vuex"
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
    name:'inicio',
    data(){
        return{
            texto: ''
        }
    },
    methods: {
        ...mapActions(['getTareas','delTarea','buscador'])
    },
    created(){
        this.getTareas()
    },
    computed:{
        ...mapState(['usuario','tareas','load_']),
        ...mapGetters(['arrayFiltered'])
    },  
    components: {
          PulseLoader
  }
}
</script>

