<template>
  <div class="event" v-on:click="eventDetailsOpen(event.event)">
    <div class="time">{{ eventTime(event.event.date) }}</div>
    <div class="band-container">
      <div class="band">{{ event.event.band }}</div>
      <div v-if="event.event.featuring && event.event.featuring.length > 0" class="featuring">
        <div>
          <i>featuring</i>
        </div>
        <div v-for="feature in event.event.featuring" :key="feature" class="feature">{{ feature }}</div>
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

<style lang="scss" scoped>
.event {
  display: flex;
  width: 100%;
  flex-direction: row;
  box-sizing: border-box;

  .time {
    flex: 1;
    font-size: 12px;
    padding: 5px;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
  }

  .band-container {
    flex: 4;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5px 5px 5px 0px;

    .band {
      font-family: 'Sedgwick Ave', cursive;
      font-size: 14px;
      color: #bec200;
    }

    .featuring {
      font-size: 10px;
      margin-top: 5px;
      font-family: "Avenir", Helvetica, Arial, sans-serif;

      .feature {
        font-size: 12px;
        margin-top: 3px;
      }
    }
  }
}

.event:not(:first-child) {
  border-top: 1px solid #56555e;
}
</style>

