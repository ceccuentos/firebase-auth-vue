<template>
  <div id="app">
    <!-- <div id="nav"> -->
     <b-navbar toggleable="md" type="dark" variant="info">
       <b-container>
          <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
          <b-navbar-brand href="#"></b-navbar-brand>

          <b-collapse id="nav_collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item :to="{name: 'inicio'}" exact v-if="existeUsuario" class="btn btn-primary mx-2 btn-sm">Inicio</b-nav-item>
              <b-nav-item :to="{name: 'registro'}" v-if="!existeUsuario" class="btn btn-primary mx-2 btn-sm">Registro</b-nav-item>
              <b-nav-item :to="{name: 'ingreso'}" v-if="!existeUsuario" class="btn btn-primary mx-2 btn-sm">Ingreso</b-nav-item>
              <a @click="cerrarSesion" v-if="existeUsuario" class="btn btn-danger mx-2 btn-sm" >Cerrar Sesión</a>
            </b-navbar-nav>
          </b-collapse>
      </b-container>
     </b-navbar> 
    <!-- </div> class="btn btn-primary mx-2" class="btn btn-danger mx-2" -->
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: 'App',
  methods: {
    ...mapActions(['cerrarSesion'])
  },
  computed:{
    ...mapGetters(['existeUsuario'])
  }
}
</script>

<style>
/*
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}*/
</style>
