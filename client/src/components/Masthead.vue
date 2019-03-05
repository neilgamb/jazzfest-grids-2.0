<template>
  <div>
    <div class="logo">
      <span class="logo-jazzfest">Jazzfest&nbsp;</span>
      <span class="logo-grids glow">GRIDS</span>
    </div>
    <carousel
      :navigateTo="currentDay"
      :per-page="1"
      :mouse-drag="false"
      :paginationEnabled="false"
      :paginationPadding="2"
      :paginationSize="6"
      :scrollPerPage="true"
      :perPageCustom="[[0, 1], [480, 2]]"
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
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import { dayOfWeek, monthOfYear } from "../helpers";

export default {
  name: "Masthead",
  props: ["currentDay", "setCurrentDay", "dates"],
  components: {
    Carousel,
    Slide
  },
  methods: {
    handleSlideChange: function(current) {
      this.setCurrentDay(current);
    },
    dayOfWeek: dayOfWeek,
    monthOfYear: monthOfYear
  }
};
</script>

<style scoped>
.logo {
  position: absolute;
  top: 0px;
  left: 0;
  height: 53px;
  background: rgb(15, 15, 15);
  display: flex;
  align-items: center;
  padding: 0px 10px;
  z-index: 1;
}

.logo .logo-jazzfest {
  font-family: "Marck Script", cursive;
  font-size: 24px;
  color: rgb(158, 40, 158);
}

.logo .logo-grids {
  font-family: "Monoton", cursive;
  font-size: 30px;
  top: 2px;
  position: relative;
}

.date-container {
  display: flex;
  justify-content: flex-end;
}

.day-of-week {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 15px;
  font-size: 20px;
}

.calendar-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.month {
  font-size: 10px;
}

.day {
  font-size: 20px;
}

.glow {
  /* font-size: 80px; */
  color: #fff;
  text-align: center;
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #cace00, 0 0 20px #cace00, 0 0 25px #cace00, 0 0 30px #cace00, 0 0 35px #cace00;
  }
  to {
    text-shadow: 0 0 10px #fff, 0 0 15px #fcff3e, 0 0 20px #fcff3e, 0 0 25px #fcff3e, 0 0 30px #fcff3e, 0 0 45px #fcff3e, 0 0 40px #fcff3e;
  }
}
</style>