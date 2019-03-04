<template>
  <div class="addVenueContainer">

    <header>
      <h1>Add Venue</h1>
      <button @click="$emit('close')" class="closeButton">
        <i class="fas fa-times"></i>
      </button>
    </header>

    <input @blur="venueInputBlur" type="text" id="venueInput" class="form-control">

    <div id="map"></div>

    <div class="actions">
      <div v-if="error" class="errorMsg">{{ this.errorMsg }}</div>
      <button v-if="!error" v-on:click="addVenue" id="addVenue" class="createButton disabled">Add Venue</button>
    </div>

  </div>
</template>

<script>
import VenueService from '../VenueService';
import { autoComplete } from '../helpers';
import { mapStyles } from '../mapStyles';

export default {
  name: "AddVenueModal",
  data() {
    return {
      venues: [],
      error: false,
      errorMsg: "",
      venue: null
    }
  },
  async created() {
    try {
      this.venues = await VenueService.getVenues();
    } catch (error) {
      this.error = true;
      this.errorMsg = error.message;
    }
  },
  mounted(){
    this.autoCompleteInit();
    this.mapInit();
  },
  methods: {
    async addVenue() {
      const { venue, error } = this;

      // check for errors before submitting server requests
      if (!error) {
        await VenueService.insertVenue(venue);
        this.venues = await VenueService.getVenues();
      }
    },
    // not currently being used anywhere
    async deleteVenue(id) {
      await VenueService.deleteVenue(id);
      this.venues = await VenueService.getVenues();
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
          zoomControl: true,
          fullscreenControl: true
        }
      );
    },
    venueUpdate(venue){
      const google = window.google;

      // set venue
      this.venue = venue;

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
          zoomControl: true,
          fullscreenControl: true
        }
      );

      // add marker
      /*eslint-disable no-unused-vars*/
      const marker = new google.maps.Marker({
        position: venueCoordinates, 
        map: map
      });

      this.addVenueErrorHandle();
    },
    venueInputBlur(e){
      if(e.target.value === "") {
        this.venue = null;
      }
      this.addVenueErrorHandle();
    },
    addVenueErrorHandle() {
      const { venue, venues } = this;
      // check to make sure input is not empty
      // disable button if so
      if(!venue) {
        this.error = true;
        this.errorMsg = "Please select a venue";
        document.getElementById('addVenue').classList.add('disabled');
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
      document.getElementById('addVenue').classList.remove('disabled');
    },
  }
};
</script>

<style scoped>
.addVenueContainer {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  background: rgb(15, 15, 15);
  color: white;
  padding: 10px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header h1 {
  margin: 0 5px;
  font-size: 24px;
}

header .closeButton {
  background: rgb(15, 15, 15);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 20px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#venueInput {
  background: #08304b;
  border: 3px solid white;
  color: white;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 10px;
  font-size: 20px;
}

#venueInput::placeholder {
  color: white;
}

#map {
  margin-top: 10px;
  height: 300px;
  width: 100%;
  border: 3px solid white;
  box-sizing: border-box;
}

.actions {
  margin-top: auto;
}

.errorMsg, 
.createButton {
  height: 50px;
  border: none;
  border: 3px solid white;
  color: white;
  width: 100%;
  background: none;
}

.createButton.disabled {
  opacity: .5;
}

.errorMsg {
  box-sizing: border-box;
  background: rgb(207, 66, 66);
  border-color: rgb(207, 66, 66);
  color: white;
}
</style>

