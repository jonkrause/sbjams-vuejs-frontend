import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
const moment = require('moment')
require('moment/locale/es')

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    thisUser: null,
    loading: false,
    error: null,
    dailyColors: null,
    lastDate: null,
    dailyArray: null,
    homeObj: null,
    countObj: null,
    countArray: null
  },
  mutations: {
    thisUser(state, payload) {
      state.thisUser = payload
    },
    setDailyColors(state, payload) {
      state.dailyColors = payload
    },
    setDailyArray(state, payload) {
      state.dailyArray = payload
    },
    setLastDate(state, payload) {
      state.lastDate = payload
      // console.log(payload)
    },
    setHomeObj(state, payload) {
      state.homeObj = payload
      console.log(state.homeObj)
    },
    setCountObj(state, payload) {
      state.countObj = payload
      console.log(state.countObj)
    },
    setCountArray(state, payload) {
      state.countArray = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    signUserUp({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false)
          const newUser = {
            user_id: user.uid,
            email: payload.email,
            color: payload.color
          }
          firebase
            .database()
            .ref('users/' + user.uid)
            .push(newUser)
            .then(data => {
              commit('thisUser', newUser)
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },
    signUserIn({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          var ref = firebase.database().ref('users/' + user.uid)
          ref.on('child_added', function(snapshot) {
            var thisUser = snapshot.val()
            commit('setLoading', false)
            commit('thisUser', thisUser)
          })
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },
    autoSignIn({ commit }, payload) {
      var ref = firebase.database().ref('users/' + payload.uid)
      ref.on('child_added', function(snapshot) {
        var thisUser = snapshot.val()
        commit('setLoading', false)
        commit('thisUser', thisUser)
      })
    },
    logout({ commit }) {
      commit('thisUser', null)
      firebase.auth().signOut()
    },
    clearError({ commit }) {
      commit('clearError')
    },

    getDailyColors({ commit }) {
      commit('setLoading', true)

      var dateFunc = false
      ////////// THIS IS THE GOOD ONE - 12/30/2017//////////
      var db = firebase.database()
      var ref = db.ref('today/colors')
      ref.orderByKey().limitToLast(1).on('child_added', function(snap) {
          var dailyArray = []
          var obj = snap.val()
          var result = Object.keys(obj).map(function(obj) {
            dailyArray.push(obj)
          })
          ///// REMOVE 'DATE' ITEM FROM ARRAY /////
          var lastone = dailyArray.splice(dailyArray.length - 1, 1)
          ///// END REMOVE 'DATE' ITEM /////
          
          commit('setDailyArray', dailyArray)
          var dayColors = snap.val()
          
          commit('setDailyColors', dayColors)
        })
    },

    lastDate({ commit }) {
      commit('setLoading', true)
      
      // SECOND FIREBASE CALL FOR DAYS SINCE //
      var lastCallArray = []
      var monthArray = []
      var yearArray = []
      var db2 = firebase.database()
      // TIMEOUT TO WAIT FOR DAILYCOLORS //
      setTimeout(() => {
        for (var n = 0; n < this.state.dailyArray.length; n++) {
          var colorData = db2.ref('color_data/' + this.state.dailyArray[n])
          var countData = db2.ref('color_data/' + this.state.dailyArray[n])
          
          colorData.orderByChild('iso').limitToLast(2).once('child_added')
            .then(data => {
              lastCallArray.push(data.val().iso)
              commit('setLastDate', lastCallArray)
            })
            .catch(err => {
              console.log(err)
            })

            countData.orderByChild('month').once('value').then(count => {
              // console.log(count.val().month)
              monthArray.push(count.val().month)
              // console.log(monthArray)
            })

            countData.orderByChild('year').once('value').then(count => {
              // console.log(count.val().ytd)
              yearArray.push(count.val().ytd)
              // console.log(yearArray)
            })

        }
        // TIMEOUT TO WAIT FOR LASTCALLARRAY //
        setTimeout(() => {
          var countArray = []
          var objs = {}
          var countObj = {}
          for(var z=0;z<this.state.dailyArray.length;z++) {
            countObj[this.state.dailyArray[z]] = {
                name: this.state.dailyArray[z],
                date: moment().format(),
                lastCalled: lastCallArray[z],
                monthCount: monthArray[z],
                yearCount: yearArray[z]
            }
            objs = {
              name: this.state.dailyArray[z],
              date: moment().format(),
              lastCalled: lastCallArray[z],
              monthCount: monthArray[z],
              yearCount: yearArray[z]
          }

            countArray.push(objs)
        }
        console.log(countObj)
        console.log(countArray)
        commit('setCountObj', countObj)
        commit('setCountArray', countArray)


          var r = {}
          var keys = this.state.dailyArray
          var values = lastCallArray
          var result = {}
          keys.forEach((key, i) => (result[key] = values[i]))
          commit('setLoading', false)
          
          commit('setHomeObj', result)
          commit('setHomeObj', result)


          



        }, 1000)
        
      }, 1000)
    }
  },
  getters: {
    thisUser(state) {
      return state.thisUser
    },
    dailyColors(state) {
      return state.dailyColors
    },
    dailyArray(state) {
      return state.dailyArray
    },
    lastDate(state) {
      return state.lastDate
    },
    homeObj(state) {
      return state.homeObj
    },
    countObj(state) {
      return state.countObj
    },
    countArray(state) {
      return state.countArray
    },
    loading(state) {
      return state.loading
    },
    error(state) {
      return state.error
    }
  }
})
