import Vue from "vue";
import App from "./App.vue";
import Vuetify from 'vuetify'
import VModal from "vue-js-modal";

import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false; // for VModal
Vue.use(VModal, { dynamic: true });
Vue.use(Vuetify, {
  iconfont: 'mdi',
  theme: {
    "primary": "#AB47BC",
    "secondary": "#fbc02d",
    "accent": "#8bc34a",
    "error": "#ef5350",
    "info": "#4fc3f7",
    "success": "#5d915b",
    "warning": "#ffa726"
  }
});

new Vue({
  render: h => h(App)
}).$mount("#app");
