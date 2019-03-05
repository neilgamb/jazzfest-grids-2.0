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

    <div v-if="venue" class="venueDetails">
      <div class="address">{{ `${venue.address_components[0].long_name} ${venue.address_components[1].long_name}` }}</div>
      <div class="contact">
        <a class="phone" :href="`tel:${venue.international_phone_number}`">{{ venue.formatted_phone_number }}</a>
        <a class="web" :href="`${venue.website}`" target="_blank">Website</a>
      </div>
    </div>

    <div class="actions">
      <div v-if="error" class="errorMsg">{{ this.errorMsg }}</div>
      <button v-if="!error" v-on:click="addVenue" id="addVenue" class="createButton">Add Venue</button>
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
    this.addVenueErrorHandle();
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
    },
    // detailsUpdate() {
    //   const { venue } = this;
    //   const address = document.querySelector('.address');
    //   const phone = document.querySelector('.phone');
    //   const web = document.querySelector('.web');
    //   address.innerHTML = `${venue.address_components[0].long_name} ${venue.address_components[1].long_name}`
    //   phone.innerHTML = "PHONE"
    //   web.innerHTML = "WEBSITE";
    // },
    venueUpdate(venue){
      this.venue = venue;
      this.mapUpdate();
      // this.detailsUpdate();
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

.venueDetails {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.address {
  font-size: 24px;
  width: 100%;
  text-align: center;
}

.contact {
  font-size: 16px;
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.venueDetails .phone, 
.venueDetails .web {
  width: 40%;
  padding: 10px;
  text-align: center;
  border: 3px solid white;
  color: white;
  text-decoration: none;
}

.actions {
  margin-top: auto;
}

.errorMsg, 
.createButton {
  height: 50px;
  border: 3px solid white;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.createButton {
  color: black;
  background: white;
  font-size: 20px;
  font-weight: 800;
}

.errorMsg {
  box-sizing: border-box;
  background: rgb(207, 66, 66);
  border: 3px solid white;
  color: white;
}
</style>

