<template>
  <div class="addVenueContainer">
    <div class="addVenue">
      <h1>Add Name</h1>
      
      <form class="create-venue">
        <div class="form-group">
          <label>Name</label>
          <input type="text" id="venueInput" class="form-control" v-model="venue.name">
        </div>
        <div id="map"></div>
      </form>
    </div>

    <button @click="$emit('close')" class="closeButton">
      <i class="fas fa-times"></i>
    </button>
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
      error: "",
      venue: {}
    }
  },
  async created() {
    try {
      this.venues = await VenueService.getVenues();
    } catch (error) {
      this.error = error.message;
    }
  },
  mounted(){
    this.autoCompleteInit();
    this.mapInit()
  },
  methods: {
    async addVenue() {
      await VenueService.insertVenue(this.venue);
      this.venues = await VenueService.getVenues();
    },
    async deleteVenue(id) {
      await VenueService.deleteVenue(id);
      this.venues = await VenueService.getVenues();
    },
    autoCompleteInit() {
      const venueInput = document.querySelector('#venueInput');
      autoComplete(venueInput, this.venueUpdate);
    },
    mapInit() {
      const newOrleans = {lat: 29.935464, lng: -90.095124};
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
      // set data
      this.venue = venue;

      const venueCoordinates = {
        lat: venue.geometry.location.lat(), 
        lng: venue.geometry.location.lng()
      };

      // update map
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
      const marker = new google.maps.Marker({
        position: venueCoordinates, 
        map: map
      });
    }
  }
};
</script>

<style scoped>
.addVenueContainer {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  color: black;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
}

.addVenue {
  flex: 12;
  display: flex;
  flex-direction: column;
}

.addVenue h1 {
  flex: 1;
  margin: 0;
}

.addVenue form {
  flex: 12;
}

.addVenue form {
  display: flex;
  flex-direction: column;
}

.addVenue form .form-group {
  display: flex;
  flex-direction: row;
  padding: 10px;
}

.addVenue label {
  flex: 2;
  display: flex;
  align-items: center;
}

.addVenue input,
.addVenue textarea {
  flex: 5;
  border: 1px solid #f0f0f0;
  padding: 5px;
}

#map {
  height: 400px;
  width: 100%;
}

.createButton {
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  height: 50px;
  border-top: 1px solid #f0f0f0;
  width: 100%;
  background: white;
}

.closeButton {
  background: white;
  position: absolute;
  background: white;
  border: none;
  border-radius: 50%;
  font-size: 20px;
  width: 50px;
  height: 50px;
  top: 5px;
  right: 5px;
}
</style>

