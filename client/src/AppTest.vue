<template>
  <v-app dark id="app">
    <Drawer/>

    <v-toolbar dark fixed app>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>

    <v-content></v-content>

    <v-footer app>
      <v-btn
        absolute
        dark
        fab
        left
        color="primary"
        style="bottom: 10px"
        v-if="!drawer"
        @click="openDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>
      <v-btn
        absolute
        dark
        fab
        left
        color="primary"
        style="bottom: 10px"
        class="hidden-md-and-down"
        v-if="drawer"
        @click="closeDrawer"
      >
        <v-icon>close</v-icon>
      </v-btn>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Drawer from "./components/Drawer";

export default {
  name: "App",
  components: {
    Drawer
  },
  computed: {
    ...mapGetters(["drawer"])
  },
  methods: {
    ...mapActions(["openDrawer", "closeDrawer"])
  }
};
</script>