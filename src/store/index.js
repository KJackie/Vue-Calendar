import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    events: []
  },
  getters: {
    events: state => state.events
  },
  mutations: {
    setEvents(state, payload) {
      console.log('payload',payload)
      state.events = payload;
      console.log('state.events',state.events)
    }
  },
  actions: {}
});