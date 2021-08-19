import Vue from 'vue'
// @ts-ignore
import VuexPersistence from 'vuex-persist'
import Vuex from 'vuex'
import * as Auth from './auth'
Vue.use(Vuex)
const persistData =  new VuexPersistence({
  storage: window.localStorage,
  modules: ['auth'],
  // asyncStorage: true
  /* your options */
})
export default new Vuex.Store({
  // @ts-ignore
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: Auth
  },
  plugins: [persistData.plugin],
})
