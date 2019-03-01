<template>
  <carousel
    :navigateTo="currentDay"
    :per-page="1"
    :mouse-drag="false"
    :paginationEnabled="false"
    :scrollPerPage="true"
    :perPageCustom="[[0, 1], [480, 2]]"
    @pageChange="handleSlideChange"
  >
    <slide v-for="date in dates" :key="date.date.toString()" class="day">
      <GridItem
        v-for="gridItem in grid"
        :gridItem="gridItem"
        :key="gridItem.venue.name"
        :eventDetailsOpen="eventDetailsOpen"
        class="gridItem"
      />
    </slide>
  </carousel>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import GridItem from "./GridItem";

export default {
  name: "Grid",
  props: ["currentDay", "setCurrentDay", "eventDetailsOpen", "dates", "grid"],
  components: {
    Carousel,
    Slide,
    GridItem
  },
  methods: {
    handleSlideChange: function(current) {
      this.setCurrentDay(current);
    }
  }
};
</script>

<style scoped>
.day {
  box-sizing: border-box;
}

.gridItem {
  display: flex;
  border-bottom: 2px solid white;
}

.grid >>> .VueCarousel-wrapper {
  overflow-y: auto;
}
</style>

