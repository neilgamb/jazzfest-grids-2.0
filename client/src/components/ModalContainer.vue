<template>
  <div>
    <modals-container/>
    <v-btn
      absolute
      dark
      fab
      left
      small
      color="primary"
      style="bottom: 100px; left: 24px"
      class="button button-add"
      @click="addClicked">
      <v-icon>add</v-icon>
    </v-btn>
    <v-btn
      absolute
      dark
      fab
      left
      small
      style="bottom: 100px; left: 24px"
      class="button button-cancel hide"
      @click="closeClicked">
      <v-icon>close</v-icon>
    </v-btn>
    <v-btn
      absolute
      dark
      fab
      left
      small
      color="secondary"
      style="bottom: 100px; z-index: -1"
      class="button button-addEvent"
      @click="eventClicked">
      <v-icon>music_note</v-icon>
    </v-btn>
    <v-btn
      absolute
      dark
      fab
      left
      small
      color="accent"
      style="bottom: 100px; z-index: -1"
      class="button button-addVenue"
      @click="venueClicked">
      <v-icon>place</v-icon>
    </v-btn>
  </div>
</template>

<script>
import AddEventModal from "./AddEventModal";
import AddVenueModal from "./AddVenueModal";

export default {
  name: "ModalContainer",
  methods: {
    addClicked(){
      document.querySelector('.button-cancel').classList.remove('hide');
      document.querySelector('.button-add').classList.add('hide');
      document.querySelector('.button-addVenue').classList.add('reveal-animate-addVenue');
      document.querySelector('.button-addVenue').classList.remove('hide-animate-addVenue');
      document.querySelector('.button-addEvent').classList.add('reveal-animate-addEvent');
      document.querySelector('.button-addEvent').classList.remove('hide-animate-addEvent');
    },
    closeClicked(){
      document.querySelector('.button-cancel').classList.add('hide');
      document.querySelector('.button-add').classList.remove('hide');
      document.querySelector('.button-addVenue').classList.remove('reveal-animate-addVenue');
      document.querySelector('.button-addVenue').classList.add('hide-animate-addVenue');
      document.querySelector('.button-addEvent').classList.remove('reveal-animate-addEvent');
      document.querySelector('.button-addEvent').classList.add('hide-animate-addEvent');
    },
    venueClicked() {
      this.closeClicked();
      this.addVenueOpen();   
    },
    eventClicked() {
      this.closeClicked();
      this.addEventOpen();
    },
    addEventOpen() {
      this.$modal.show(
        AddEventModal,
        { 
          venues: this.venues,
          addEventClose: this.addEventClose
        },
        {
          adaptive: true,
          width: "100%",
          height: "100%"
        }
      );
    },
    addEventClose(events){
      this.events = events;
      this.createGrid();
    },
    addVenueOpen() {
      this.$modal.show(
        AddVenueModal,
        { 
          venues: this.venues,
          addVenueClose: this.addVenueClose
        },
        {
          adaptive: true,
          width: "100%",
          height: "100%"
        }
      );
    },
    addVenueClose(venues) {
      this.venues = venues;
    },
  }
};
</script>

<style lang="scss" scoped>
@import '../scss/variables.scss';

.button-addVenue,
.button-addEvent {
  left: 24px;
}

.button-cancel {
  border: 1px solid white;
}

.hide {
    display: none;
}

/* Animations */
.reveal-animate-addVenue {
    animation-name: reveal-addVenue;
    animation-duration: 300ms;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in-out;
}

@keyframes reveal-addVenue {
    0% {
        left: 24px;
    }
    50% {
        left: 180px;
    }
    100% {
        left: 135px;
        z-index: 4;
    }
}

.hide-animate-addVenue {
    animation-name: hide-addVenue;
    animation-duration: 300ms;
    animation-timing-function: ease-in-out;
}

@keyframes hide-addVenue {
    0% {
        left: 160px;
        z-index: 4;
    }
    50% {
        left: 200px;
        z-index: 4;
    }
    100% {
        left: 35px;
        z-index: -1;
    }
}

.reveal-animate-addEvent {
    animation-name: reveal-addEvent;
    animation-duration: 300ms;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in;
    animation-delay: 50ms;
}

@keyframes reveal-addEvent {
    0% {
        left: 24px;
    }
    50% {
        left: 120px;
    }
    100% {
        left: 80px;
        z-index: 4;
    }
}

.hide-animate-addEvent {
    animation-name: hide-addEvent;
    animation-duration: 300ms;
    animation-timing-function: ease-in-out;
}

@keyframes hide-addEvent {
    0% {
        right: 106px;
        z-index: 4;
        opacity: 1;
    }
    50% {
        right: 180px;
        z-index: 4;
        opacity: .5;
    }
    100% {
        right: 35px;
        z-index: -1;
    }
}
</style>

