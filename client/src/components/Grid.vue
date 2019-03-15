<template>
  <carousel
    :navigateTo="currentDay"
    :per-page="1"
    :mouse-drag="false"
    :paginationEnabled="false"
    :scrollPerPage="true"
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
  margin-top: 10px;
  /* border-bottom: 1px solid #56555e; */
}

.grid >>> .VueCarousel-wrapper {
  overflow-y: auto;
}
</style>

