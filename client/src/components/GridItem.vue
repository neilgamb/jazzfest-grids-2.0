<template>
  <v-card>
    <div class="venue">{{ gridItem.venue.venue.name }}</div>
    <div class="events">
      <Event
        v-for="event in gridItem.events"
        :eventDetailsOpen="eventDetailsOpen"
        :event="event"
        :key="event.band"
      />
    </div>
  </v-card>
</template>

<script>
import Event from "./Event";

export default {
  name: "GridItem",
  props: ["gridItem", "eventDetailsOpen"],
  components: {
    Event
  }
};
</script>

<style scoped>
.venue {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  font-size: 16px;
  text-align: center;
} 
.events {
  flex: 4;
  display: flex;
  justify-content: center;  
  align-items: center;
  flex-direction: column;
  border-left: 1px solid #56555e;
}
</style>

