<template>
  <Grid
    :currentDay="currentDay"
    :setCurrentDay="setCurrentDay"
    :dates="dates"
    :grid="grid"
    class="gridViewContainer"
  />
</template>

<script>
import Grid from "./Grid";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "GridView",
  components: {
    Grid
  },
  computed: {
    ...mapGetters(["dates", "grid", "currentDay"])
  },
  methods: {
    ...mapActions(["setCurrentDay"]),
  }
};
</script>
