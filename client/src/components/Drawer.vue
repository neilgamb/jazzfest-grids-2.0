<template>
  <v-navigation-drawer :value="drawer" fixed app>
    <v-list>
      <v-list-tile to="/" @click="closeDrawer" ripple>
        <v-list-tile-action>
          <v-icon>grid_on</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Grid</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile to="/map" @click="closeDrawer" ripple>
        <v-list-tile-action>
          <v-icon>public</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Map</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-btn
      absolute
      dark
      fab
      left
      color="primary"
      style="bottom: 30px"
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
@import "../scss/_mixins.scss";
@import "../scss/variables.scss";

.routerLink {
  font-size: 20px;
  text-decoration: none;
  color: $white;
}
</style>

