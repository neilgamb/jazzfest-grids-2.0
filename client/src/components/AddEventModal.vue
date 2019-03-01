<template>
  <div class="addEventContainer">
    <div class="addEvent">
      <h1>Add Event</h1>
      <form @submit.prevent="addPost">
        <div class="form-group">
          <label>Band</label>
          <input type="text" class="form-control" v-model="post.band">
        </div>

        <div class="form-group">
          <label>Featuring</label>
          <textarea class="form-control" v-model="post.featuring" rows="1"></textarea>
        </div>

        <div class="form-group">
          <label>Venue</label>
          <input type="text" class="form-control" v-model="post.venue">
        </div>

        <div class="form-group">
          <label>Date</label>
          <input type="date" class="form-control" v-model="post.date">
        </div>

        <div class="form-group">
          <label>Doors</label>
          <input type="date" class="form-control" v-model="post.doors">
        </div>

        <div class="form-group">
          <label>Price</label>
          <input type="number" class="form-control" v-model="post.price">
        </div>

        <div class="form-group">
          <label>Tickets</label>
          <input type="text" class="form-control" v-model="post.tix">
        </div>

        <button class="createButton">Create</button>
      </form>
    </div>

    <button @click="$emit('close')" class="closeButton">
      <i class="fas fa-times"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "AddEventModal",
  data() {
    return {
      post: {}
    };
  },
  methods: {
    addPost() {
      console.log(this.post);
    }
  }
};
</script>

<style scoped>
.addEventContainer {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  color: black;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
}

.addEvent {
  flex: 12;
  display: flex;
  flex-direction: column;
}

.addEvent h1 {
  flex: 1;
  margin: 0;
}

.addEvent form {
  flex: 12;
}

.addEvent form {
  display: flex;
  flex-direction: column;
}

.addEvent form .form-group {
  display: flex;
  flex-direction: row;
  padding: 10px;
}

.addEvent label {
  flex: 2;
  display: flex;
  align-items: center;
}

.addEvent input,
.addEvent textarea {
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

