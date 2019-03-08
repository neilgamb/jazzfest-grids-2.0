<template>
  <div>
    <button @click="addClicked" class="button button-add">
        <i class="fas fa-plus"></i>
    </button>
    <button @click="closeClicked" class="button button-cancel hide">
        <i class="fas fa-times"></i>
    </button>
    <button @click="venueClicked" class="button button-addVenue">
        <i class="fas fa-map-marker-alt"></i>
    </button>
    <button @click="eventClicked" class="button button-addEvent">
        <i class="fas fa-music"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "ButtonContainer",
  props: ["addEventOpen", "addVenueOpen"],
  methods: {
    addClicked(){
      document.querySelector('.button-cancel').classList.remove('hide');
      document.querySelector('.button-add').classList.remove('hide');
      document.querySelector('.button-addVenue').classList.add('reveal-animate-addVenue');
      document.querySelector('.button-addEvent').classList.add('reveal-animate-addEvent');
      document.querySelector('.button-addVenue').classList.remove('hide-animate-addVenue');
      document.querySelector('.button-addEvent').classList.remove('hide-animate-addEvent');
    },
    closeClicked(){
      document.querySelector('.button-cancel').classList.add('hide');
      document.querySelector('.button-add').classList.remove('hide');
      document.querySelector('.button-addVenue').classList.remove('reveal-animate-addVenue');
      document.querySelector('.button-addEvent').classList.remove('reveal-animate-addEvent');
      document.querySelector('.button-addVenue').classList.add('hide-animate-addVenue');
      document.querySelector('.button-addEvent').classList.add('hide-animate-addEvent');
    },
    venueClicked() {
      this.closeClicked();
      this.addVenueOpen();   
    },
    eventClicked() {
      this.closeClicked();
      this.addEventOpen();
    }
  }
};
</script>

<style scoped>
.button {
    position: fixed;
    border: none;
    transition: 200ms ease;
    background: #3b8239;
    animation: reveal 1s;
    outline: none;
}

.button:hover {
    cursor: pointer;
}

.button-add,
.button-cancel {
    bottom: 65px;
    right: 15px;
    height: 70px;
    width: 70px;
    border-radius: 70px;
    font-size: 2rem;
    z-index: 1;
}

.button-add {
    box-shadow: 0px 0px 20px 4px #090e0b;
}

.button-cancel {
    transform: scale(1.1);
    box-shadow: 0px 0px 12px 3px #3b8239;
}

.button-addVenue,
.button-addEvent {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    font-size: 1.2rem;
    box-shadow: 0px 0px 12px 3px #3b8239;
}

.button-addVenue,
.button-addEvent {
    bottom: 80px;
    right: 30px;
    z-index: 0;
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
        /* opacity: 0; */
        right: 35px;
    }
    50% {
        /* opacity: .5; */
        right: 200px;
    }
    100% {
        /* opacity: 1; */
        right: 160px;
    }
}

.hide-animate-addVenue {
    animation-name: hide-addVenue;
    animation-duration: 300ms;
    animation-timing-function: ease-in-out;
}

@keyframes hide-addVenue {
    0% {
        /* opacity: 1; */
        right: 160px;
    }
    50% {
        /* opacity: .5; */
        right: 200px;
    }
    100% {
        /* opacity: 0; */
        right: 35px;
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
        /* opacity: 0; */
        right: 35px;
    }
    50% {
        /* opacity: .5; */
        right: 180px;
    }
    100% {
        /* opacity: 1; */
        right: 106px;
    }
}

.hide-animate-addEvent {
    animation-name: hide-addEvent;
    animation-duration: 300ms;
    animation-timing-function: ease-in-out;
}

@keyframes hide-addEvent {
    0% {
        /* opacity: 1; */
        right: 106px;
    }
    50% {
        /* opacity: .5; */
        right: 180px;
    }
    100% {
        /* opacity: 0; */
        right: 35px;
    }
}
</style>

