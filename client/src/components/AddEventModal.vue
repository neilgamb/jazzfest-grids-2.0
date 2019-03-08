<template>
  <div class="addEventContainer">
    <header>
      <h1>Add Event</h1>
      <button @click="$emit('close')" class="closeButton">
        <i class="fas fa-times"></i>
      </button>
    </header>

    <form class="create-event">
      <div class="form-group">
        <label>Band</label>
        <input type="text" class="form-control" v-model="event.band">
      </div>

      <div class="form-group">
        <label>Featuring</label>
        <textarea class="form-control" v-model="event.featuring" rows="1"></textarea>
      </div>

      <div class="form-group">
        <label>Venue</label>
        <select
          name="venue"
          class="form-control"
          id="venueSelect"
          v-model="event.venue"
          v-on:change="venueChange"
        >
          <option
            v-for="venue in venues"
            :value="venue.venue.id"
            :key="venue.venue.id"
          >{{venue.venue.name}}</option>
        </select>
      </div>

      <div class="form-group">
        <label>Date</label>
        <datetime
          class="datetimeInput form-control"
          type="datetime"
          :inputStyle="dateInputStyle"
          use12-hour
          :minute-step="30"
          v-model="event.date"
        ></datetime>
      </div>

      <div class="form-group">
        <label>Tix Price</label>
        <input type="number" class="form-control" v-model="event.price">
      </div>

      <div class="form-group">
        <label>Tix Link</label>
        <input type="text" class="form-control" v-model="event.tix">
      </div>
    </form>

    <div class="actions">
      <div v-if="error" class="errorMsg">{{ this.errorMsg }}</div>
      <button v-if="!error" v-on:click="addEvent" id="addEvent" class="createButton">Add Event</button>
    </div>
  </div>
</template>

<script>
import EventService from "../services/EventService";

export default {
  name: "AddEventModal",
  props: ["venues", "addEventClose"],
  data() {
    return {
      gridItems: [],
      error: "",
      event: {},
      dateInputStyle: {
        background: "#08304b",
        border: "none",
        color: "white"
      }
    };
  },
  methods: {
    async addEvent() {
      const { event, error } = this;
      let featuring = [];

      if(event.featuring && event.featuring.length > 0){
        event.featuring.split(', ').map(feature => featuring.push(feature));
      }
      event.featuring = featuring;

      // check for errors before submitting server requests
      if (!error) {
        await EventService.insertEvent(event);
        const events = await EventService.getEvents();
        this.addEventClose(events);
        this.$emit("close");
      }
    },
    // not currently being used anywhere
    async deleteEvent(id) {
      await EventService.deleteEvent(id);
    },
    venueChange(e) {
      console.log(e.target.value);
      console.log(this.venues);
    }
  }
};
</script>

<style lang="scss" scoped>
.addEventContainer {
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

  h1 {
    margin: 0 5px;
    font-size: 24px;
  }

  .closeButton {
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
}

.form-group {
  display: flex;
  align-items: center;

  label {
    flex: 1;
    font-size: 20px;
  }

  input,
  textarea,
  select,
  .datetimeInput {
    flex: 2;
    background: #08304b;
    border: 3px solid white;
    color: white;
    padding: 10px;
    box-sizing: border-box;
    margin-top: 10px;
    font-size: 20px;
    height: 50px;
  }

  input::placeholder,
  textarea::placeholder,
  select::placeholder {
    color: white;
  }
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

