import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
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
    accent: "#5d915b",
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
    // currentEventDetails: null,
    venues: [],
    events: [],
    error: null,
    grid: []
  },
  getters: {
    drawer: state => state.drawer,
    currentDay: state => state.currentDay,
    currentPeriod: state => state.currentPeriod,
    venues: state => state.venues,
    events: state => state.events,
    grid: state => state.grid.filter(gridItem => gridItem.period === state.currentPeriod && gridItem.day === state.currentDay),
    error: state => state.error,
    dates: state => state.dates.filter(date => date.period === state.currentPeriod),
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
    setCurrentPeriod(state, period) {
      state.currentPeriod = period;
      // state.currentDay = 0;
    },
    setVenues(state, venues) {
      state.venues = venues;
    },
    setEvents(state, events) {
      state.events = events;
    },
    setGrid(state, grid) {
      state.grid = grid;
    },
    setError(state, error) {
      state.error = error;
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
    setCurrentPeriod({ commit }, period) {
      commit("setCurrentPeriod", period);
    },
    setVenues({ commit }, venues) {
      commit("setVenues", venues);
    },
    setEvents({ commit }, events) {
      commit("setEvents", events);
    },
    setGrid({ commit }, grid) {
      commit("setGrid", grid);
    },
    setError({ commit }, error) {
      commit("setError", error);
    }
  }
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
