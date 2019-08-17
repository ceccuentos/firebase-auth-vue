<template>
    <div>
    <h1>Editar</h1>
    {{id}} - {{tarea}}
    <form @submit.prevent="editTarea(tarea)" class="form-inline">
        <div class="input-group mb-2 mr-sm-2">
            <div class="input-group-prepend">
            <div class="input-group-text">Editar</div>
            </div>
            <input type="text" v-model="$v.tarea.nombre.$model" class="form-control"> 
            
        </div>
        <button type="submit" class="btn btn-primary mb-2" :disabled="!$v.$invalid">Editar</button> 
    </form>
    {{$v.tarea.$params}}
    <small class="text-danger d-block" v-if="!$v.tarea.nombre.required">Campo Requerido</small>
    <small class="text-danger d-block" v-if="!$v.tarea.$params.minLength">Min. 5 Car.</small>  


    </div>

</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'
export default {
    name:'Editar',
    data(){
        return {
            id: this.$route.params.id,
            nombre: ''
        }
    },
    methods: {
        ...mapActions(['getTarea','editTarea'])
    },
    created(){
        this.getTarea(this.id)
    },
    computed:{
        ...mapState(['tarea','load_'])
    },
    validations: {
         
         tarea: {
             nombre: {required}, 
             minLength: minLength(5)
         } 
    },
    
}

</script>
