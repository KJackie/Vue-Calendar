import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import FullCalendar from "vue-full-calendar";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';






// Vue.component("ValidationProvider", ValidationProvider);
// Vue.component("ValidationObserver", ValidationObserver);
// Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
Vue.use(FullCalendar);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");