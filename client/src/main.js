import Vue from "vue";
import App from "./App.vue";
import Vuetify from 'vuetify'
import VModal from "vue-js-modal";
import Datetime from 'vue-datetime'

import 'vuetify/dist/vuetify.min.css';
import 'vue-datetime/dist/vue-datetime.css';

Vue.use(Vuetify, {
  iconfont: 'mdi', // 'md' || 'mdi' || 'fa' || 'fa4'
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
Vue.use(VModal, { dynamic: true });
Vue.use(Datetime);
Vue.config.productionTip = false; // for VModal

new Vue({
  render: h => h(App)
}).$mount("#app");
