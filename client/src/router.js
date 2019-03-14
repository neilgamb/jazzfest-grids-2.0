import Vue from "vue";
import Router from "vue-router";
import GridView from "./components/GridView.vue";
import MapView from "./components/MapView.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "grid",
      component: GridView
    },
    {
      path: "/map",
      name: "map",
      component: MapView
    }
  ]
});
