<template>
  <div class="addVenueContainer">

    <v-container class="header" text-xs-center>
      <v-layout row wrap>
        <v-flex xs11>
          <h1>Add Venue</h1>
        </v-flex>
        <v-flex xs1>
          <v-btn @click="$emit('close')" class="closeButton" flat icon>
            <v-icon large>close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container class="bodyContainer" grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field 
            hide-details
            label="venue" 
            id="venueInput" 
            placeholder="search..."
            :value="venue && `${venue.name}, ${venue.formatted_address}`"
            @focus="clearInput"
          >
          </v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-card>
            <div id="map"></div>
          </v-card>
        </v-flex>

        <v-flex xs12 v-if="venue" class="venueDetails">
          <h2>{{ `${venue.address_components[0].long_name} ${venue.address_components[1].long_name}` }}</h2>
        </v-flex>

        <v-layout v-if="venue" justify-center>
          <v-flex xs5>
            <v-btn 
              block 
              large
              color="primary"
              :href="`tel:${venue.international_phone_number}`">
              Call<v-icon right>phone</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs5>
            <v-btn 
              block 
              large
              color="primary" 
              target="_blank"
              :href="`${venue.website}`">
              Website<v-icon right>public</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
    
    <v-container class="footer" grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs12>
          <v-alert
            :value="saving"
            class="alertButton"
            type="success">
            <h3><v-progress-circular indeterminate /></h3>
          </v-alert>
          <v-alert
            :value="!error && !saving"
            type="success"
            class="alertButton"
            @click="addVenue">
            <h3>Add Venue</h3>
          </v-alert>
          <v-alert
            :value="error"
            type="error"
            class="alertButton">
            <h3>{{ this.errorMsg }}</h3>
          </v-alert>
        </v-flex>
      </v-layout>
    </v-container>

  </div>
</template>

<script>
import VenueService from '../services/VenueService';
import { autoComplete } from '../util/helpers';
import { mapStyles } from '../util/mapStyles';
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AddVenueModal",
  data() {
    return {
      error: false,
      errorMsg: "",
      venue: null,
      saving: false
    }
  },
  mounted(){
    this.autoCompleteInit();
    this.mapInit();
    this.addVenueErrorHandle();
  },
  computed: {
    ...mapGetters(["venues"])
  },
  methods: {
    ...mapActions(["setVenues"]),
    async addVenue() {
      const { venue, error } = this;

      // check for errors before submitting server requests
      if (!error) {
        this.saving = true;
        await VenueService.insertVenue(venue);
        const venues = await VenueService.getVenues();
        this.saving = false;
        this.$emit('close');
        this.setVenues(venues);
      }
    },
    // not currently being used anywhere
    async deleteVenue(id) {
      await VenueService.deleteVenue(id);
      // this.venues = await VenueService.getVenues();
    },
    autoCompleteInit() {
      const venueInput = document.querySelector('#venueInput');
      autoComplete(venueInput, this.venueUpdate);
    },
    mapInit() {
      const google = window.google;
      const newOrleans = {lat: 29.935464, lng: -90.095124};
      /*eslint-disable no-unused-vars*/
      const map = new google.maps.Map(
        document.getElementById('map'), {
          zoom: 12, 
          center: newOrleans,
          styles: mapStyles,
          disableDefaultUI: true,
        }
      );
    },
    mapUpdate() {
      const { google } = window;
      const { venue } = this;
      const venueCoordinates = {
        lat: venue.geometry.location.lat(), 
        lng: venue.geometry.location.lng()
      };
        // update map
      /*eslint-disable no-unused-vars*/
      const map = new google.maps.Map(
        document.getElementById('map'), {
          zoom: 17, 
          center: venueCoordinates,
          styles: mapStyles,
          disableDefaultUI: true,
        }
      );

      /*eslint-disable no-unused-vars*/
      const marker = new google.maps.Marker({
        position: venueCoordinates, 
        map: map
      });
    },
    venueUpdate(venue){
      this.venue = venue;
      this.mapUpdate();
      this.addVenueErrorHandle();
    },
    clearInput(e){
      this.venue = null;
    },
    addVenueErrorHandle() {
      const { venue, venues } = this;

      // check to make sure input is not empty
      if(!venue) {
        this.error = true;
        this.errorMsg = "Please select a venue";
        return;
      }

      // check if venues already contains venue
      if(venue && venues.some(ven => ven.venue.id === venue.id)){
        this.error = true;
        this.errorMsg = "This venue already exists in the database!";
        return;
      } 

      this.error = false;
      this.errorMsg = "";
    },
  }
};
</script>

<style lang="scss" scoped>
@import '../scss/_mixins.scss';
@import '../scss/_variables.scss';

.addVenueContainer {
  height: 100%;
  background: $background-color-dark;

  .header {
    padding-bottom: 0;

    h1 {
      text-align: left;
      margin: 0px 0px 0px 2px;
      font-family: "Monoton", cursive;
      font-weight: 400;
      color: lighten($secondary, 10%);
      animation: glow 3s ease-in-out infinite alternate;
    }

    .closeButton {
      margin: 0;
    }
  }

  .bodyContainer {
    padding-top: 10px;
    margin-bottom: 56px;

    #map {
      height: 300px;
      width: 100%;
      border-radius: 4px;
    }

    .venueDetails {
      margin-top: 20px;
    }
  }

  .footer {
    padding: 0;
    position: absolute;
    bottom: 0;

    .alertButton {
      margin: 0;
      border: none;
    }
  }
}
</style>

