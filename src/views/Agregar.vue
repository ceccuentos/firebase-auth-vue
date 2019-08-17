<template>
    <div>
        <h1>Agregar</h1>
        
        <form @submit.prevent="addTarea($v.nombre.$model)" class="form-inline">                
            <div class="input-group mb-2 mr-sm-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">Nombre</div>
                    </div>
                    <input type="text" class="form-control" v-model="$v.nombre.$model">
            </div>
            
            <button type="submit" class="btn btn-primary mb-2" :disabled="$v.$invalid || load_">Agregar</button>
        </form>    
        <small class="text-danger d-block" v-if="!$v.nombre.required">Campo Requerido</small>
        <small class="text-danger d-block" v-if="!$v.nombre.minLength">Min. 5 Car.</small>
        <!-- {{$v.nombre}} -->
        {{$v.nombre}}
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
    name: 'Agregar',
    data() {
        return {
            nombre: ''
        }
    },
    methods:{
        ...mapActions(['addTarea'])
    },
    validations: {
        nombre: {
            required,
            minLength: minLength(5)
        }
    },    
    computed:{
        ...mapState(['load_'])
    }
    
}
</script>
