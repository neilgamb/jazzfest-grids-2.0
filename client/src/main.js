import Vue from "vue";
import App from "./App.vue";
import VModal from "vue-js-modal";
import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

Vue.config.productionTip = false;
Vue.use(VModal, { dynamic: true });
Vue.use(Datetime);

new Vue({
  render: h => h(App)
}).$mount("#app");
