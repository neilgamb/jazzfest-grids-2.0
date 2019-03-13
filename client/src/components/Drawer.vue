<template>
  <v-navigation-drawer :value="drawer" fixed app>
    <v-list dense>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            <router-link to="/">Home</router-link>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon>info</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            <router-link to="/about">About</router-link>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-btn
      absolute
      dark
      fab
      left
      color="primary"
      style="bottom: 10px"
      class="hidden-lg-and-up"
      @click="closeDrawer"
    >
      <v-icon>close</v-icon>
    </v-btn>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Drawer",
  computed: {
    ...mapGetters(["drawer"])
  },
  methods: {
    ...mapActions(["openDrawer", "closeDrawer"])
  }
};
</script>

<style lang="scss" scoped>
</style>

