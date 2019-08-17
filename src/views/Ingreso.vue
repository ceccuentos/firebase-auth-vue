<template>
    <div>
        <h1>Formulario de Ingreso</h1>
        <form @submit.prevent="ingresoUsuario({email, password})">
            <input type="email" v-model="$v.email.$model" 
            class="form-control my-2" placeholder="Ingresa Email">
            <small class="text-danger d-block" v-if="!$v.email.required">Campo Requerido</small>
            <small class="text-danger d-block" v-if="!$v.email.email">Email no válido</small>

            <input type="password" v-model="$v.password.$model" 
            class="form-control my-2" placeholder="Ingresa Password">
            <small class="text-danger d-block" v-if="!$v.password.required">Campo Requerido</small>
            <small class="text-danger d-block" v-if="!$v.password.minLength">Mín. 6 Car.</small>


            <button type="submit" class="btn btn-info" :disabled="$v.$invalid">Acceder</button>
        </form>   
        
        <p v-if="error === 'auth/user-not-found'">Usuario Incorrecto</p> 
        <p v-if="error === 'auth/wrong-password'">Password Incorrecta</p> 
        <!-- {{$v.email}} -->
    </div>
</template>

<script>
import {mapActions, mapState} from "vuex"
import { required, minLength, email } from 'vuelidate/lib/validators'
export default {
    name: "Ingreso",
    data(){
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        ...mapActions(["ingresoUsuario"])
    },
    computed: {
        ...mapState(['error'])
    },
       validations: {
        email: {required, email},
        password: {required, minLength: minLength(6)}
        }
    
}

</script>