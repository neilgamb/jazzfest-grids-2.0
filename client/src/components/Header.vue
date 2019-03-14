<template>
  <v-toolbar dark fixed app>
    <v-toolbar-title class="titleContainer">
      <div class="logoContainer">
        <span class="logo-jazzfest">Jazz
          <br>Fest
        </span>
        <span class="logo-grids">GRIDS</span>
      </div>
    </v-toolbar-title>
    <div class="carouselContainer">
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
        @pageChange="setCurrentDay"
      >
        <slide v-for="date in dates" :key="date.date.toString()" class="date-container">
          <div class="day-of-week">{{ dayOfWeek(date.date) }}</div>
          <div class="calendar-container">
            <div class="month">{{ monthOfYear(date.date) }}</div>
            <div class="day">{{ date.date.getDate() }}</div>
          </div>
        </slide>
      </carousel>
    </div>
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
  updated() {
    console.log(this.dates);
  },
  computed: {
    ...mapGetters(["dates", "currentDay", "currentPeriod"])
  },
  methods: {
    ...mapActions(["setCurrentDay"]),
    getDates(dates, period) {
      return dates.filter(date => date.period === period);
    },
    dayOfWeek: dayOfWeek,
    monthOfYear: monthOfYear
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/_mixins.scss";
@import "../scss/variables.scss";

/deep/ .v-toolbar__content {
  padding: 0px;
}

.titleContainer {
  height: 150%;
  width: 100%;
  display: flex;
  justify-content: space-between;

  .logoContainer {
    position: relative;
    width: 50%;

    .logo-jazzfest {
      font-family: "Rock Salt", cursive;
      color: $primary;
      font-size: 20px;
      line-height: 23px;
      text-shadow: 1px 1px $black;
      transform: rotate(-32deg);
      z-index: 2;
      position: absolute;
      top: 20px;
      left: 10px;
    }

    .logo-grids {
      font-family: "Monoton", cursive;
      font-size: 35px;
      color: lighten($secondary, 10%);
      animation: glow 3s ease-in-out infinite alternate;
      position: absolute;
      top: 20px;
      left: 60px;
    }
  }
}

.carouselContainer {
  width: 40%;
  max-width: 200px;

  .date-container {
    display: flex;
    justify-content: space-around;

    .day-of-week {
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: "Sedgwick Ave", cursive;
      font-size: 22px;
    }

    .calendar-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .month {
        font-size: 10px;
      }

      .day {
        font-size: 20px;
        line-height: 20px;
      }
    }
  }
}
</style>

