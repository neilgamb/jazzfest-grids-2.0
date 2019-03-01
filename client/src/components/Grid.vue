<template>
  <div class="container">
    <h1>Latest Post</h1>
      <div class="create-post">
        <label for="create-post">Say something</label>
        <input id="create-post" type="text" v-model="text" placeholder="create a post">
        <button v-on:click="createPost">Post</button>
      </div>
    <hr>
    <p v-if="error" class="error">{{ error }}</p>
    <div class="gridItemsContainer">
      <div class="gridItem" 
        v-for="(gridItem, i) in gridItems" 
        v-bind:index="i"
        v-bind:key="gridItem._id"
        @click="deletePost(gridItem._id)"
      >
      {{ `${gridItem.createdAt.getDate()}/${gridItem.createdAt.getMonth()}` }}
      <p class="text">{{ gridItem.text }}</p>
      </div>
    </div>  
  </div>
</template>

<script>
import GridService from '../GridService';
export default {
  name: 'Grid',
  data() {
    return {
      gridItems: [],
      error: "",
      text: ""
    }
  },
  async created() {
    try {
      this.gridItems = await GridService.getGridItems();
    } catch (error) {
      this.error = error.message;
    }
  },
  methods: {
    async createPost() {
      await GridService.insertPost(this.text);
      this.gridItems = await GridService.getGridItems();
    },
    async deletePost(id) {
      await GridService.deletePost(id);
      this.gridItems = await GridService.getGridItems();
    }
  }
}
</script>

<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid red;
  background-color: yellow;
  padding: 10px;
  margin-bottom: 15px;
}

div.gridItem {
  position: relative;
  border: 1px solid green;
  background: lightgreen;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background: darkgreen;
  color: white;
  font-size: 13px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
