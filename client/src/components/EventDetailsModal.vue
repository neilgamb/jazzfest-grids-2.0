<template>
  <div class="eventDetailsContainer">
    <div class="eventDetails">{{ event.band }}</div>
    <button @click="$emit('close'); eventDetailsClose()" class="closeButton">Close</button>
  </div>
</template>

<script>
export default {
  name: "EventDetailsModal",
  props: ["event", "eventDetailsClose"]
};
</script>

<style scoped>
.eventDetailsContainer {
  height: 100%;
  background: $background-color;
}
</style>

