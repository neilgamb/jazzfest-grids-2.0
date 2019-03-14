import Vue from "vue";
import Vuex from "vuex";
// import App from "./App.vue";
import AppTest from "./AppTest.vue";
import Vuetify from "vuetify";
import VModal from "vue-js-modal";
import router from "./router";
import { data } from "./assets/data";
import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VModal, { dynamic: true });
Vue.use(Vuetify, {
  iconfont: "mdi",
  theme: {
    primary: "#AB47BC",
    secondary: "#fbc02d",
    accent: "#8bc34a",
    error: "#ef5350",
    info: "#4fc3f7",
    success: "#5d915b",
    warning: "#ffa726"
  }
});

const store = new Vuex.Store({
  state: {
    drawer: false,
    currentDay: 0,
    currentPeriod: 0,
    dates: data.dates,
    currentEventDetails: null,
    venues: [],
    events: [],
    error: false,
    errorMsg: "",
    grid: []
  },
  getters: {
    drawer: state => state.drawer,
    currentDay: state => state.currentDay,
    currentPeriod: state => state.currentPeriod,
    dates: state =>
      state.dates.filter(date => date.period === state.currentPeriod)
  },
  mutations: {
    openDrawer(state) {
      state.drawer = true;
    },
    closeDrawer(state) {
      state.drawer = false;
    },
    setCurrentDay(state, day) {
      state.currentDay = day;
    },
    setCurrentPeruod(state, period) {
      state.currentPeriod = period;
    }
  },
  actions: {
    openDrawer({ commit }) {
      commit("openDrawer");
    },
    closeDrawer({ commit }) {
      commit("closeDrawer");
    },
    setCurrentDay({ commit }, day) {
      commit("setCurrentDay", day);
    },
    setCurrentPeruod({ commit }, period) {
      commit("setCurrentPeruod", period);
    }
  }
});

new Vue({
  store,
  router,
  render: h => h(AppTest)
}).$mount("#app");
