<template>
  <v-footer app height="auto" class="footerContainer">
      <v-btn
        absolute
        dark
        fab
        left
        color="primary"
        style="bottom: 30px"
        v-if="!drawer"
        @click="openDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
      <v-btn
        absolute
        dark
        fab
        left
        color="primary"
        style="bottom: 30px"
        class="hidden-md-and-down"
        v-if="drawer"
        @click="closeDrawer">
        <v-icon>close</v-icon>
      </v-btn>
      
      <v-bottom-nav
        class="bottomNav"
        :active.sync="bottomNav"
        :color="color"
        :value="true"
        dark>
        <div class="bottomNavBtn" @click="setCurrentPeriod(bottomNav)">
          <v-btn dark>
            <span>Weekend<br>One</span>
          </v-btn>
        </div>
        <div class="bottomNavBtn" @click="setCurrentPeriod(bottomNav)">
          <v-btn dark>
            <span>Daze<br>Between</span>
          </v-btn>
        </div>
        <div class="bottomNavBtn" @click="setCurrentPeriod(bottomNav)">
          <v-btn dark>
            <span>Weekend<br>Two</span>
          </v-btn>
        </div>
      </v-bottom-nav>
  </v-footer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Footer",
  data () {
    return {
      bottomNav: 0
    }
  },
  computed: {
    ...mapGetters(["drawer"]),
      color () {
        switch (this.bottomNav) {
          case 0: return '#48224f'
          case 1: return '#826316'
          case 2: return '#354d1a'
          default: return null;
        }
      }
  },
  methods: {
    ...mapActions(["openDrawer", "closeDrawer", "setCurrentPeriod"])
  }
};
</script>

<style lang="scss" scoped>
.footerContainer {
  height: auto;
  justify-content: flex-end;
  font-family: "Rock Salt", cursive;

  .bottomNav {
    padding-left: 100px;

    .bottomNavBtn {
      display: flex;
      justify-content: center;

      button {
        max-width: none;
      }
    }
  }
}
</style>
