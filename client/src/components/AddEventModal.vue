<template>
  <div class="addEventContainer">
  <v-container class="header" text-xs-center>
    <v-layout row wrap>
      <v-flex xs11>
        <h1>Add Event</h1>
      </v-flex>
      <v-flex xs1>
        <v-btn @click="$emit('close')" class="closeButton" flat icon>
          <v-icon large>close</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>

  <v-form
    ref="form"
    v-model="valid"
    lazy-validation>
    <v-container class="bodyContainer" grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            v-model="name"
            label="Event Name (optional)"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            v-model="band"
            :counter="20"
            :rules="bandRules"
            label="Band"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-combobox
              chips
              multiple
              v-model="featuring"
              label="Featuring"
            ></v-combobox>
        </v-flex>
        <v-flex xs12>
          <v-select
            v-model="venue"
            :items="venues"
            :rules="venueRules"
            item-text="venue.name"
            item-value="venue.id"
            label="Venue"
            required
          ></v-select>
        </v-flex>
        <v-flex xs6>
          <v-dialog
            ref="dateDialog"
            v-model="dateModal"
            :return-value.sync="date"
            persistent
            lazy
            full-width
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="computedDateFormatted"
                label="Date"
                prepend-icon="event"
                readonly
                required
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" scrollable>
              <v-spacer></v-spacer>
              <v-btn @click="dateModal = false">Cancel</v-btn>
              <v-btn @click="$refs.dateDialog.save(date)">OK</v-btn>
            </v-date-picker>
          </v-dialog> 
        </v-flex>
        <v-flex xs6>
          <v-dialog
            ref="timeDialog"
            v-model="timeModal"
            :return-value.sync="time"
            persistent
            lazy
            full-width
            width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="time"
                label="Time"
                prepend-icon="access_time"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="timeModal"
              v-model="time"
              full-width>
              <v-spacer></v-spacer>
              <v-btn @click="timeModal = false">Cancel</v-btn>
              <v-btn @click="$refs.timeDialog.save(time)">OK</v-btn>
            </v-time-picker>
          </v-dialog>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            label="Ticket Price"
            v-model="price"
            prefix="$"
          ></v-text-field>
          </v-flex>
      </v-layout>
    </v-container>
  </v-form>


    <!-- <header>

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
    </div> -->


  </div>
</template>

<script>
import EventService from "../services/EventService";

export default {
  name: "AddEventModal",
  props: ["venues", "addEventClose"],
  data: (vm) => ({
    valid: true,
    // event name
    name: '',
    // band
    band: '',
    bandRules: [
      v => !!v || 'Band / lead act is required',
      v => (v && v.length <= 20) || 'Name must be less than 20 characters'
    ],
    featuring: null,
    // venue
    venue: '',
    venueRules: [
      v => !!v || 'Venue is required',
    ],
    // date
    dateModal : false,
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    dateRules: [
      v => !!v || 'Date is required',
    ],
    // time
    timeModal : false,
    time: '',
    timeRules: [
      v => !!v || 'Time is required',
    ], 
    // ticket price
    price: '',
    // ticket link,
    tix: ''
  }),
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    }
  },
  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    }
  },
  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
    // async addEvent() {
    //   const { event, error } = this;
    //   let featuring = [];

    //   if(event.featuring && event.featuring.length > 0){
    //     event.featuring.split(', ').map(feature => featuring.push(feature));
    //   }
    //   event.featuring = featuring;

    //   // check for errors before submitting server requests
    //   if (!error) {
    //     await EventService.insertEvent(event);
    //     const events = await EventService.getEvents();
    //     this.addEventClose(events);
    //     this.$emit("close");
    //   }
    // },
    // // not currently being used anywhere
    // async deleteEvent(id) {
    //   await EventService.deleteEvent(id);
    // },
    // venueChange(e) {
    //   // console.log(e.target.value);
    //   // console.log(this.venues);
    // }
  }
};
</script>

<style lang="scss" scoped>
@import '../scss/_variables.scss';
@import '../scss/_mixins.scss';

.addEventContainer {
  height: 100%;
  background: $background-color;

  .header {
    padding-bottom: 0;

    h1 {
      text-align: left;
      margin: 0px 0px 0px 2px;
      font-family: "Monoton", cursive;
      font-weight: 400;
      color: lighten($secondary, 10%);
      animation: glow 3s ease-in-out infinite alternate;
    }

    .closeButton {
      margin: 0;
    }
  }
}
</style>

