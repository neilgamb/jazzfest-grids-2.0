<template>
  <div class="mapViewContainer">
    <div id="mapView"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapStyles } from '../util/mapStyles';
import moment from 'moment';

export default {
  name: "MapView",
  data(){
    return {
      map: null,
      markers: [],
      eventsForMap: [],
    }
  },
  mounted(){
    this.mapInit();
    this.getEventsForMap();
  },
  computed: { 
    ...mapGetters(["currentDay", "currentPeriod", "venues", "events", "dates"]),
  },
  watch: {
    currentDay: function(){
      this.getEventsForMap();
    },
    currentPeriod: function(){
      this.getEventsForMap();
    },
    venues: function() {
      this.getEventsForMap();
    },
    eventsForMap: function() {
      this.deleteMarkers();
      this.updateMarkers();
      this.setMapOnAll(this.map);
    }
  },
  methods: {
    mapInit() {
      const google = window.google;
      const newOrleans = {lat: 29.935464, lng: -90.095124};
      /*eslint-disable no-unused-vars*/
      const map = new google.maps.Map(
        document.getElementById('mapView'), {
          zoom: 12, 
          center: newOrleans,
          styles: mapStyles,
          disableDefaultUI: true,
        }
      );
      this.map = map;
    },
    getEventsForMap(){
      const { currentDay, dates, events, venues } = this;
      const currentDate = dates[currentDay].date;
      let eventsForMap = [];

      events.map(e => {
        let eventDate = new Date(e.event.date);
        // let eventVenue = venues.filter(v => v.venue.id === e.event.venue);

        e.event.venueInfo = venues.find(v => v.venue.id === e.event.venue).venue;

        if (eventDate.getHours() < 12) {
          eventDate = moment(eventDate).subtract(1, "days");
        }

        if(moment(eventDate).isSame(currentDate, "day")){
          eventsForMap.push(e.event);
        }
      })

      this.eventsForMap = eventsForMap;
    },
    deleteMarkers() {
      this.setMapOnAll(null);
      this.markers = [];
    },
    setMapOnAll(map){
      const { markers } = this;
      markers.map(marker => marker.setMap(map))
    },
    addMarker(eventLocation, event) {
      const content = `
        <div id="content">
          <h3>${event.band}</h3>
          <div>${event.venueInfo.name} // ${moment(event.date).format("h:mm a")}</div>
          <div><a href="${event.tix}" target="_blank">Tickets: $${event.price}</a></div>
        </div>
      `;
      const infoWindow = new window.google.maps.InfoWindow({
        content: content
      });

      const marker = new window.google.maps.Marker({
        position: eventLocation,
        animation: window.google.maps.Animation.DROP,
        map: this.map,
        title: 'test'
      });
      marker.addListener('click', () => infoWindow.open(this.map, marker));
      this.markers.push(marker);
    },
    updateMarkers(){
      const { eventsForMap } = this;
      const google = window.google;

      eventsForMap.map(event => {
        const { lat, lng } = event.venueInfo.geometry.location
        const eventLocation = new google.maps.LatLng(lat, lng);
        this.addMarker(eventLocation, event);
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.mapViewContainer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: black;

  #mapView {
    height: 100%;
    width: 100%;
  }
}
</style>
