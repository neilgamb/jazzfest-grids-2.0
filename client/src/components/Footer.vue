<template>
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
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Footer",
  computed: {
    ...mapGetters(["drawer"])
  },
  methods: {
    ...mapActions(["openDrawer", "closeDrawer"])
  }
};
</script>