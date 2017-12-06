import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import App from './App'
import router from './router'
import * as firebase from 'firebase'
import { store } from './store'
import AlertCmp from './components/shared/alert.vue'
require('moment/locale/en-ca')

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

Vue.use(VueMaterial)

Vue.use(Vuetify)
Vue.use(require('vue-moment'));

Vue.config.productionTip = false
Vue.component('app-alert', AlertCmp)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),

  beforeMount() {
    console.log("before mount")

    this.$store.dispatch('getDailyColors').then(() => {
      return this.$store.dispatch('lastDate')
    })
  },
  beforeUpdate() {
    
  },
  created () {
    firebase.initializeApp({
      apiKey: '',
      authDomain: '',
      databaseURL: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: ''
    })
    
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('in')
        this.$store.dispatch('autoSignIn', user)
      } else {
        console.log('out')
      }
    })

  }
  
})
