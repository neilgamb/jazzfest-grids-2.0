<template>
  <v-app dark id="app">
    <Header/>
    <Drawer/>
    <v-content>
      <router-view />
    </v-content>
    <Footer />
    <ModalContainer />
  </v-app>
</template>

<script>
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ModalContainer from "./components/ModalContainer";
import VenueService from "./services/VenueService";
import EventService from "./services/EventService";
import { getFestDay } from "./util/helpers.js";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "App",
  components: {
    Drawer,
    Header,
    Footer,
    ModalContainer
  },
  created() {
    this.getEvents();
    this.getVenues();
  },
  computed: {
    ...mapGetters(["dates", "venues", "events"])
  },
  methods: {
    ...mapActions(["setEvents", "setVenues", "setGrid", "setError"]),
    async getEvents() {
      try {
        const events = await EventService.getEvents();
        this.setEvents(events);
      } catch (error) {
        this.setError(error);
      }
    },  
    async getVenues() {
      try {
        const venues = await VenueService.getVenues();
        this.setVenues(venues);
        this.buildGrid();
      } catch (error) {
        this.setError(error);
      }
    },
    buildGrid() {
      const { dates, events, venues } = this;
      let grid = [];

      // for each venue...
      venues.map(venue => {
        
        // loop through every date...
        dates.map(date => {

          // create a unique 'grid item / block'
          const gridItem = {
            day: null,
            period: null,
            venue: venue,
            events: []
          };

          // loop through each event
          events.map((event) => {
            let eventDate = new Date(event.event.date);
              
            // first need to adjust for shows starting > 11:59pm
            if (eventDate.getHours() < 12) {
              eventDate = moment(eventDate).subtract(1, "days");
            }

            // populate grid item based on date && venue
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
      
      this.setGrid(grid);
    }
  },
};
</script>

<style lang="scss" scoped>
@import './scss/_variables.scss';

#app {
  font-family: 'Sedgwick Ave', cursive;
}

main {
  padding: 5px 0px;
}
</style>