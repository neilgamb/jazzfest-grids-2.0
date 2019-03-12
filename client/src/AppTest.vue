<template>
  <v-app dark id="app">
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list dense>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <router-link to="/">Home</router-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>info</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <router-link to="/about">About</router-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-btn absolute dark fab style="bottom: 10px" left color="primary" @click="drawer = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-navigation-drawer>

    <v-toolbar dark fixed app>  
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>

    <v-content>

    </v-content>

    <v-footer app>
      <v-btn absolute dark fab style="bottom: 10px" left color="primary" @click="drawer = true">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null
    })
  }
</script>