<template>
  <div id="app">
    <Masthead
      :currentDay="currentDay"
      :setCurrentDay="setCurrentDay"
      :dates="getDates(currentPeriod)"
      class="masthead"
    />

    <Grid
      :currentDay="currentDay"
      :setCurrentDay="setCurrentDay"
      :eventDetailsOpen="eventDetailsOpen"
      :dates="getDates(currentPeriod)"
      :grid="getGrid(currentPeriod)"
      class="grid"
    />

    <Tabs :activeTab="currentPeriod" :setActiveTab="setActiveTab"/>

    <button class="addEventButton" v-on:click="addEventOopen()">
      <i class="fas fa-plus"></i>
    </button>

    <modals-container/>
  </div>
</template>

<script>
import Grid from "./components/Grid";
import Masthead from "./components/Masthead";
import Tabs from "./components/Tabs";
import EventDetailsModal from "./components/EventDetailsModal";
import AddEventModal from "./components/AddEventModal";
import { data } from "./assets/data.js";
import { collateGrid } from "./helpers.js";

export default {
  name: "app",
  components: {
    Masthead,
    Grid,
    Tabs
  },
  data() {
    return {
      currentDay: 0,
      currentPeriod: 0,
      currentEventDetails: null,
      dates: data.dates,
      grid: collateGrid(data.grid)
    };
  },
  methods: {
    setCurrentDay: function(day) {
      this.currentDay = day;
    },
    setActiveTab: function(tab) {
      this.currentPeriod = tab;
      this.currentDay = 0;
    },
    eventDetailsOpen: function(eventDetails) {
      this.currentEventDetails = eventDetails;
      this.$modal.show(
        EventDetailsModal,
        {
          event: this.currentEventDetails,
          eventDetailsClose: this.eventDetailsClose
        },
        {
          adaptive: true,
          width: "100%",
          height: "100%"
        }
      );
    },
    eventDetailsClose: function() {
      this.currentEventDetails = null;
    },
    addEventOopen: function() {
      this.$modal.show(
        AddEventModal,
        {},
        {
          adaptive: true,
          width: "100%",
          height: "100%"
        }
      );
    },
    getDates: function(period) {
      const { dates } = this;
      return dates.filter(date => date.period === period);
    },
    getGrid: function(period) {
      const { grid } = this;
      return grid.filter(
        gridItem =>
          gridItem.period === period && gridItem.day === this.currentDay
      );
    }
  }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: rgb(15, 15, 15);
  color: white;
}

.masthead {
  border-bottom: 2px solid white;
  padding: 10px;
}

.grid {
  flex: 1;
}

.addEventButton {
  position: absolute;
  height: 60px;
  width: 60px;
  background: white;
  color: black;
  bottom: 70px;
  right: 10px;
  border-radius: 50%;
  transition: 50ms;
}

.addEventButton:active {
  transform: scale(0.9);
}
</style>
