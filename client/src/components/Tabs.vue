<template>
  <div class="tabs-container">
    <div
      v-on:click="handleTabClick(0)"
      v-bind:class="[ activeTab === 0 ? 'active' : '' ]"
      class="tab"
    >Weekend
      <br>One
    </div>
    <div
      v-on:click="handleTabClick(1)"
      v-bind:class="[ activeTab === 1 ? 'active' : '' ]"
      class="tab"
    >Daze
      <br>Between
    </div>
    <div
      v-on:click="handleTabClick(2)"
      v-bind:class="[ activeTab === 2 ? 'active' : '' ]"
      class="tab"
    >Weekend
      <br>Two
    </div>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  props: ["activeTab", "setActiveTab"],
  methods: {
    handleTabClick: function(tab) {
      this.setActiveTab(tab);
    }
  }
};
</script>

<style scoped>
.tabs-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #56555e;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}

.tab {
  flex: 1;
  padding: 10px 0px;
  line-height: 16px;
  font-size: 18px;
}

.tab:not(:first-child) {
  border-left: 1px solid #56555e;
}

.tab.active {
  background: #bfc132;
  /* color: rgb(0, 0, 0); */
}
</style>
 
