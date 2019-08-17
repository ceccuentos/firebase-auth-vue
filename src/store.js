import Vue from 'vue'
import Vuex from 'vuex'


var firebase = require("firebase/app");
import router from './router'

import db from './main'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        usuario: '',
        error: '',
        tareas: [],
        tarea: { nombre: "", id: "" },
        load_: false,
        texto: ''
    },
    mutations: {
        setUsuario(state, payload) {
            state.usuario = payload
        },
        setError(state, payload) {
            state.error = payload
        },
        setTareas(state, tareas) {
            state.tareas = tareas
        },
        setTarea(state, item) {
            state.tarea = item
        },
        eliminarTarea(state, id) {
            state.tareas = state.tareas.filter(doc => {
                return doc.id != id
            })
        },
        load_Firebase(state, payload) {
            state.load_ = payload
        }
    },
    actions: {
        buscador({ commit, state }, payload) {
            console.log(payload);
            state.texto = payload.toLowerCase()
        },
        crearUsuario({ commit }, payload) {
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(res => {
                    console.log(res.user.email);
                    console.log(res.user.uid);
                    commit('setUsuario', { email: res.user.email, uid: res.user.uid })

                    // Crea Coleccion
                    db.collection(res.user.email).add({
                            nombre: 'Tarea ejemplo'
                        })
                        .then(() => {
                            router.push({ name: 'inicio' })
                        })

                })
                .catch(err => {
                    console.log(err.message);
                    commit('setError', err.code)
                })
        },
        ingresoUsuario({ commit }, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(res => {
                    console.log(res);
                    commit('setUsuario', { email: res.user.email, uid: res.user.uid })
                    router.push({ name: 'inicio' })
                })
                .catch(err => {
                    console.log(err);
                    commit('setError', err.code)
                })
        },
        detectarUsuario({ commit }, payload) {
            if (payload != null) {
                commit('setUsuario', { email: payload.email, uid: payload.uid })
            } else {
                commit('setUsuario', null)
            }
        },
        cerrarSesion({ commit }) {
            firebase.auth().signOut()
            commit('setUsuario', null)
            router.push({ name: 'ingreso' })
        },
        getTareas({ commit }) {

            commit('load_Firebase', true)

            const tareas = []
            const usuario = firebase.auth().currentUser
            db.collection(usuario.email).get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        //console.log(doc.id);
                        //console.log(doc.data());
                        let tarea = doc.data();
                        tarea.id = doc.id
                        tareas.push(tarea)
                    })
                    commit('load_Firebase', false)
                })


            commit('setTareas', tareas)
        },
        getTarea({ commit }, id) {
            const usuario = firebase.auth().currentUser
            db.collection(usuario.email).doc(id).get()
                .then(doc => {
                    let tarea = doc.data();
                    tarea.id = doc.id;
                    commit('setTarea', tarea)
                })
        },
        editTarea({ commit }, tarea) {
            const usuario = firebase.auth().currentUser
            db.collection(usuario.email).doc(tarea.id).update({
                    nombre: tarea.nombre
                })
                .then(() => {
                    router.push({ name: 'inicio' })
                })
        },
        addTarea({ commit }, nombre) {
            commit('load_Firebase', true)
            const usuario = firebase.auth().currentUser
            db.collection(usuario.email).add({
                    nombre: nombre
                })
                .then(doc => {
                    console.log(doc.id);
                    router.push({ name: 'inicio' })
                    commit('load_Firebase', false)
                })
        },
        delTarea({ commit, dispatch }, id) {
            const usuario = firebase.auth().currentUser
            db.collection(usuario.email).doc(id).delete()
                .then(() => {
                    console.log('Tarea Eliminada')
                        //dispatch('getTareas')
                    commit('eliminarTarea', id)
                })
        }
    },
    getters: {
        existeUsuario(state) {
            if (state.usuario === null || state.usuario === '' || state.usuario === undefined) {
                return false
            } else {
                return true
            }

        },
        arrayFiltered(state) {
            let arregloFiltered = []
            for (let tarea of state.tareas) {
                let nombre = tarea.nombre.toLowerCase();
                if (nombre.indexOf(state.texto) >= 0) {
                    arregloFiltered.push(tarea)
                }
            }
            return arregloFiltered;
        }
    }
})