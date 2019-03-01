<template>
  <div class="addVenueContainer">
    <div class="addVenue">
      <h1>Add Event</h1>
      
      <form class="create-venue">
        <div class="form-group">
          <label>Band</label>
          <input type="text" class="form-control" v-model="post.band">
        </div>

        <div class="form-group">
          <label>Featuring</label>
          <textarea class="form-control" v-model="post.featuring" rows="1"></textarea>
        </div>

        <button v-on:click="createPost" class="createButton">Create</button>
      </form>
    </div>

    <button @click="$emit('close')" class="closeButton">
      <i class="fas fa-times"></i>
    </button>
  </div>
</template>

<script>
import VenueService from '../VenueService';

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
  methods: {
    async createVenue() {
      await VenueService.insertVenue(this.venue);
      this.venues = await VenueService.getVenues();
    },
    async deleteVenue(id) {
      await VenueService.deleteVenue(id);
      this.venues = await VenueService.getVenues();
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

