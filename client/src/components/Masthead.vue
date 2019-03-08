<template>
  <div>
    <div class="logo">  
      <span class="logo-jazzfest">Jazz<br>Fest</span>
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
import { dayOfWeek, monthOfYear } from "../util/helpers";

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

<style lang="scss" scoped>
.logo {
  position: absolute;
  top: 2px;
  left: 3px;
  height: 53px;
  background: rgb(15, 15, 15);
  display: flex;
  align-items: center;
  padding: 0px 10px;
  z-index: 1;

  .logo-jazzfest {
    font-family: 'Rock Salt', cursive;
    font-size: 20px;
    color: #9e289e;
    line-height: 23px;
    position: relative;
    top: 0px;
    right: 6px;
    z-index: 2;
    -webkit-transform: rotate(-32deg);
    transform: rotate(-32deg);
    text-shadow: -1px 1px 0px #ea83e0, 1px -1px 0 #090808, -1px 1px 0 #000, 1px 1px 0 #000;
  }

  .logo-grids {
    font-family: "Monoton", cursive;
    font-size: 35px;
    left: -18px;
    position: relative;
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
    font-family: 'Sedgwick Ave', cursive;
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

.glow {
  /* font-size: 80px; */
  color: #fffb93;
  text-align: center;
  animation: glow 3s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    text-shadow: 0 0 0px #fffb93, 0 0 5px #fffb93, 0 0 15px #fbff00, 0 0 25px #fbff00, 0 0 50px #fbff00;
  }
  to {
    text-shadow: 0 0 10px #fffb93, 0 0 10px #fffb93, 0 0 20px #fcff3e, 0 0 40px #fcff3e, 0 0 500px #fcff3e;
  }
}
</style>