<template>
    <div>
        <h1>Registro</h1>
        <form @submit.prevent="crearUsuario({email:email, password:password})">
            <input type="email" v-model="$v.email.$model" class="form-control my-2" placeholder="Ingresa Email">
            <small class="text-danger d-block" v-if="!$v.email.required">Campo Requerido</small>
            <small class="text-danger d-block" v-if="!$v.email.email">Email no válido</small>

            <input type="password" v-model="$v.password.$model" class="form-control my-2" placeholder="Ingresa Password">
            <small class="text-danger d-block" v-if="!$v.password.required">Campo Requerido</small>
            <small class="text-danger d-block" v-if="!$v.password.minLength">Mín. 6 Car.</small>

            <input type="password" v-model="$v.passwordconf.$model" class="form-control my-2" placeholder="Re-Ingresa Password">
            <!-- <small class="text-danger d-block" v-if="!$v.passwordconf.required">Campo Requerido</small> -->
            <small class="text-danger d-block" v-if="!$v.passwordconf.sameAs">Password no coincide</small>

            <button type="submit" class="btn btn-info" :disabled="!desactivar">Crear Usuario</button>
        </form>
        <!-- <p>{{error}}</p> -->
        <p v-if="error === 'auth/email-already-in-use'">Usuario ya existe</p> 


    <!--     {{$v.email}} -->
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import { required, minLength, sameAs, email } from 'vuelidate/lib/validators'

export default {
    name: "registro",
    data() {
        return {
            email: '',
            password: '',
            passwordconf: ''
        }
    },
    methods: {
        ...mapActions(['crearUsuario'])
    },
    computed:{
        ...mapState(['error']),
        desactivar() {
            return this.password === this.passwordconf && this.password != ''
        }
    },
    validations: {
        email: {required, email},
        password: {required, minLength: minLength(6)},
        passwordconf: {sameAs:sameAs('password')}
        }
  
    

}
</script>
