import Vue from 'vue'

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import App from './App.vue'
import router from './router'
import store from './store'

var firebase = require("firebase/app");
require("firebase/auth");
//require("firebase/database");
require("firebase/firestore");
//require("firebase/messaging");
//require("firebase/functions");



// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAWIfjMw7lhJGAXf2nF2rM7u9OS1AUpZ40",
    authDomain: "proy-2-b6612.firebaseapp.com",
    databaseURL: "https://proy-2-b6612.firebaseio.com",
    projectId: "proy-2-b6612",
    storageBucket: "proy-2-b6612.appspot.com",
    messagingSenderId: "309470074603",
    appId: "1:309470074603:web:3f22d418a33cf542"
};
// Initialize Firebase
//firebase.initializeApp(firebaseConfig);

const firebaseApp = firebase.initializeApp(firebaseConfig);

firebaseApp.firestore().settings({ timestampsInSnapshots: true });

export default firebaseApp.firestore()

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged((user) => {
    console.log(user);
    if (user) {
        store.dispatch('detectarUsuario', { email: user.email, uid: user.uid })
    } else {
        store.dispatch('detectarUsuario', null)
    }

    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app')

})