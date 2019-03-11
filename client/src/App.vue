<template>
  <v-app dark>
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

      <ButtonContainer :addEventOpen="addEventOpen" :addVenueOpen="addVenueOpen"/>

      <modals-container/>
    </div>
  </v-app>
</template>

<script>
import Grid from "./components/Grid";
import Masthead from "./components/Masthead";
import Tabs from "./components/Tabs";
import ButtonContainer from "./components/ButtonContainer";
import VenueService from "./services/VenueService";
import EventService from "./services/EventService";
import EventDetailsModal from "./components/EventDetailsModal";
import AddEventModal from "./components/AddEventModal";
import AddVenueModal from "./components/AddVenueModal";
import { data } from "./assets/data.js";
import { getFestDay } from "./util/helpers.js";
import moment from "moment";

export default {
  name: "app",
  components: {
    Masthead,
    Grid,
    Tabs,
    ButtonContainer
  },
  data() {
    return {
      currentDay: 0,
      currentPeriod: 0,
      currentEventDetails: null,
      venues: [],
      events: [],
      error: false,
      errorMsg: "",
      dates: data.dates,
      grid: []
    };
  },
  created() {
    this.getEvents();
    this.getVenues();
  },
  methods: {
    async getEvents() {
      try {
        this.events = await EventService.getEvents();
      } catch (error) {
        this.error = true;
        this.errorMsg = error.message;
      }
    },
    async getVenues() {
      try {
        this.venues = await VenueService.getVenues();
        this.createGrid();
      } catch (error) {
        this.error = true;
        this.errorMsg = error.message;
      }
    },
    setCurrentDay(day) {
      this.currentDay = day;
    },
    setActiveTab(tab) {
      this.currentPeriod = tab;
      this.currentDay = 0;
    },
    eventDetailsOpen(eventDetails) {
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
    eventDetailsClose() {
      this.currentEventDetails = null;
    },
    addEventOpen() {
      this.$modal.show(
        AddEventModal,
        { 
          venues: this.venues,
          addEventClose: this.addEventClose
        },
        {
          adaptive: true,
          width: "100%",
          height: "100%"
        }
      );
    },
    addEventClose(events){
      this.events = events;
      this.createGrid();
    },
    addVenueOpen() {
      this.$modal.show(
        AddVenueModal,
        { 
          venues: this.venues,
          addVenueClose: this.addVenueClose
        },
        {
          adaptive: true,
          width: "100%",
          height: "100%"
        }
      );
    },
    addVenueClose(venues) {
      this.venues = venues;
    },
    getDates(period) {
      const { dates } = this;
      return dates.filter(date => date.period === period);
    },
    getGrid(period) {
      const { grid } = this;
      return grid.filter(
        gridItem =>
          gridItem.period === period && gridItem.day === this.currentDay
      );
    },
    createGrid() {
      const { dates } = data;
      let grid = [];
    
      this.venues.map(venue => {
        dates.map(date => {
          const gridItem = {
            day: null,
            period: null,
            venue: venue,
            events: []
          };

          this.events.map((event, i) => {
            let eventDate = new Date(event.event.date);
              
            if (eventDate.getHours() < 12) {
              eventDate = moment(eventDate).subtract(1, "days");
            }

            if (
              event.event.venue === venue.venue.id &&
              moment(eventDate).isSame(date.date, "day")
            ) {
              gridItem.events.push(event);
              gridItem.day = getFestDay(eventDate);
              gridItem.period = date.period;
            }
          });

          if (gridItem.events.length && gridItem.events.length > 0) {
            grid.push(gridItem);
          }
        });
      });

      this.grid = grid;
    }
  }
};
</script>

<style lang="scss" scoped>
@import './scss/_variables.scss';

#app {
  font-family: 'Sedgwick Ave', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: $background-color;
  color: $text-color-primary;
}

.masthead {
  border-bottom: 1px solid $border-color-primary;
  padding: 10px;
}

.grid {
  flex: 1;
}
</style>
