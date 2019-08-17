import Vue from 'vue'
import Router from 'vue-router'
import { nextTick } from 'q';
var firebase = require("firebase/app");
import db from './main'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/registro',
            name: 'registro',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Registro.vue')
        },
        {
            path: '/',
            name: 'inicio',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Inicio.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/ingreso',
            name: 'ingreso',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Ingreso.vue')
        },
        {
            path: '/agregar',
            name: 'agregar',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Agregar.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/editar/:id',
            name: 'editar',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Editar.vue'),
            meta: { requiresAuth: true }
        }
    ]
})

router.beforeEach((to, from, next) => {
    const rutaProd = to.matched.some(record => record.meta.requiresAuth)
    var user = firebase.auth().currentUser;

    if (rutaProd === true && user === null) {
        next({ name: 'ingreso' })
    } else {
        next()
    }
})

export default router;