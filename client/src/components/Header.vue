<template>
  <v-toolbar dark fixed app>
    <v-toolbar-title>
      <div class="logo">
        <span class="logo-jazzfest">Jazz
          <br>Fest
        </span>
        <span class="logo-grids">GRIDS</span>
      </div>

      <carousel
        :navigateTo="currentDay"
        :per-page="1"
        :mouse-drag="false"
        :paginationEnabled="false"
        :paginationPadding="2"
        :paginationSize="6"
        :scrollPerPage="true"
        paginationActiveColor="#f0f0f0"
        paginationColor="#666"
        @pageChange="handleSlideChange"
      >
        <slide v-for="date in dates" :key="date.date.toString()" class="date-container">
          <div class="day-of-week">{{ dayOfWeek(date.date) }}</div>
          <div class="calendar-container">
            <div class="month">{{ monthOfYear(date.date) }}</div>
            <div class="day">{{ date.date.getDate() }}</div>
          </div>
        </slide>
      </carousel>

    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Carousel, Slide } from "vue-carousel";
import { dayOfWeek, monthOfYear } from "../util/helpers";

export default {
  name: "Header",
  components: {
    Carousel,
    Slide
  },
  computed: {
    ...mapGetters(["dates", "currentDay"])
  },
  methods: {
    ...mapActions(["setCurrentDay"]),
    handleSlideChange: function(current) {
      this.setCurrentDay(current);
    },
    dayOfWeek: dayOfWeek,
    monthOfYear: monthOfYear
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/_mixins.scss";
@import "../scss/variables.scss";

.logo {
  position: absolute;
  top: 2px;
  left: 3px;
  height: 53px;
  // background: $background-color;
  // box-shadow: 16px -20px 16px 6px $background-color;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  z-index: 1;

  .logo-jazzfest {
    font-family: "Rock Salt", cursive;
    font-size: 20px;
    color: $primary;
    line-height: 23px;
    position: relative;
    top: 2px;
    right: 6px;
    z-index: 2;
    transform: rotate(-32deg);
    text-shadow: 1px 1px $black;
  }

  .logo-grids {
    font-family: "Monoton", cursive;
    font-size: 35px;
    left: -30px;
    position: relative;
    text-align: center;
    color: lighten($secondary, 10%);
    animation: glow 3s ease-in-out infinite alternate;
  }
}

.date-container {
  display: flex;
  justify-content: flex-end;
  font-family: "Avenir", Helvetica, Arial, sans-serif;

  .day-of-week {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 10px;
    font-size: 22px;
    font-family: "Sedgwick Ave", cursive;
  }

  .calendar-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 10px;

    .month {
      font-size: 10px;
    }

    .day {
      font-size: 20px;
      line-height: 20px;
    }
  }
}
</style>

