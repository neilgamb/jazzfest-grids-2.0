<template>
  <div>
    <div class="venue">{{ gridItem.venue.name }}</div>
    <div class="events">
      <Event
        v-for="event in gridItem.events"
        :eventDetailsOpen="eventDetailsOpen"
        :event="event"
        :key="event.band"
      />
    </div>
  </div>
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
  padding: 0px 5px;
}
.events {
  flex: 4;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-left: 2px solid white;
}
</style>

