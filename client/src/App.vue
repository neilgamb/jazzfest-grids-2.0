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

    <ButtonContainer :addEventOpen="addEventOpen"/>

    <modals-container/>

  </div>
</template>

<script>
import Grid from "./components/Grid";
import Masthead from "./components/Masthead";
import Tabs from "./components/Tabs";
import ButtonContainer from './components/ButtonContainer';
import EventDetailsModal from "./components/EventDetailsModal";
import AddEventModal from "./components/AddEventModal";
import { data } from "./assets/data.js";
import { collateGrid } from "./helpers.js";

export default {
  name: "app",
  components: {
    Masthead,
    Grid,
    Tabs,
    ButtonContainer,
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
    addEventOpen: function() {
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
  /* background-image: linear-gradient(to right top, #12161c, #141924, #161c2c, #1b1e33, #21203a); */
  color: white;
}

.masthead {
  border-bottom: 2px solid white;
  padding: 10px;
}

.grid {
  flex: 1;
}
</style>
