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
  width: 100%;
  display: flex;
  flex-direction: column;
  color: black;
}

.eventDetails {
  flex: 12;
}

.closeButton {
  border-top: 2px solid white;
  background: white;
  flex: 1;
}
</style>

