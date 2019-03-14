<template>
  <v-app dark id="app">
    <Header/>
    <Drawer/>
    <v-content>
      <router-view />
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Drawer,
    Header,
    Footer,
  }
};
</script>