import Vue from "vue";
import App from "./App.vue";
import Vuetify from 'vuetify'
import VModal from "vue-js-modal";
import Datetime from 'vue-datetime'

import 'vuetify/dist/vuetify.min.css';
import 'vue-datetime/dist/vue-datetime.css';

Vue.use(Vuetify)
Vue.use(VModal, { dynamic: true });
Vue.use(Datetime);
Vue.config.productionTip = false; // for VModal

new Vue({
  render: h => h(App)
}).$mount("#app");
