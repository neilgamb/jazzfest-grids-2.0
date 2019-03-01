<template>
  <div class="event" v-on:click="eventDetailsOpen(event)">
    <div class="time">{{ eventTime(event.date) }}</div>
    <div class="band-container">
      <div class="band">{{ event.band }}</div>
      <div v-if="event.featuring.length > 0" class="featuring">
        <div>
          <i>featuring</i>
        </div>
        <div v-for="feature in event.featuring" :key="feature" class="feature">{{ feature }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Event",
  props: ["event", "eventDetailsOpen"],
  methods: {
    eventTime: function(date) {
      return moment(date).format("h:mm a");
    }
  }
};
</script>

<style scoped>
.event {
  display: flex;
  width: 100%;
  flex-direction: row;
  padding: 10px;
  box-sizing: border-box;
}

.event:not(:first-child) {
  border-top: 2px solid white;
}

.event .time {
  flex: 1;
  font-size: 12px;
}

.event .band-container {
  flex: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.featuring {
  font-size: 12px;
  margin-top: 5px;
}

.feature {
  font-size: 14px;
  margin-top: 3px;
}
</style>

