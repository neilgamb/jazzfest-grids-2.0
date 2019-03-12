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

  <v-container class="bodyContainer" grid-list-md text-xs-center>
    <v-form
      ref="form"
      v-model="valid">
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              required
              v-model="band"
              :counter="20"
              :rules="bandRules"
              label="Artist"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              v-model="name"
              label="Event Name (optional)"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-combobox
                chips
                multiple
                v-model="featuring"
                label="Featuring (optional)"
              ></v-combobox>
          </v-flex>
          <v-flex xs12>
            <v-select
              required
              v-model="venue"
              :items="venues"
              :rules="venueRules"
              item-text="venue.name"
              item-value="venue.id"
              label="Venue"
            ></v-select>
          </v-flex>
          <v-flex xs6>
            <v-dialog
              lazy
              persistent
              full-width
              ref="dateDialog"
              v-model="dateModal"
              :return-value.sync="date"
              width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field
                  readonly
                  required
                  v-on="on"
                  :rules="dateRules"
                  prepend-icon="event"
                  v-model="computedDateFormatted"
                  label="Date"
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
              lazy
              persistent
              full-width
              ref="timeDialog"
              v-model="timeModal"
              :return-value.sync="time"
              width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field
                  readonly
                  required
                  v-on="on"
                  :rules="timeRules"
                  prepend-icon="access_time"
                  v-model="computedTimeFormatted"
                  label="Time"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="timeModal"
                v-model="time"
                :allowed-minutes="allowedStep"
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
          <v-flex xs12>
            <v-text-field
              label="Link to Purchase Tickets"
              v-model="tix"
            ></v-text-field>
          </v-flex>      
        </v-layout>
    </v-form>
  </v-container>

    <v-container class="footer" grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs12>
          <v-alert
            :value="saving"
            class="alertButton"
            type="success">
            <h3><v-progress-circular indeterminate /></h3>
          </v-alert>
          <v-alert
            :value="valid && !saving"
            type="success"
            class="alertButton"
            @click="addEvent">
            <h3>Add Event</h3>
          </v-alert>
          <v-alert
            :value="!valid"
            type="error"
            class="alertButton">
            <h3>Please complete required fields</h3>
          </v-alert>
        </v-flex>
      </v-layout>
    </v-container>


    <!-- <header>
    <div class="actions">
      <div v-if="error" class="errorMsg">{{ this.errorMsg }}</div>
      <button v-if="!error" v-on:click="addEvent" id="addEvent" class="createButton">Add Event</button>
    </div> -->


  </div>
</template>

<script>
import EventService from "../services/EventService";
import moment from "moment";

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
    date: null,
    dateFormatted: null,
    dateRules: [
      v => !!v || 'Date is required',
    ],
    // time
    timeModal : false,
    time: null,
    timeFormatted: null,
    timeRules: [
      v => !!v || 'Time is required',
    ], 
    // ticket price
    price: '',
    // ticket link,
    tix: '',
    // saving & validation
    saving: false
  }),
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    },
    computedTimeFormatted () {
      return this.formatTime(this.time)
    },
  },
  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    },
    time (val) {
      this.timeFormatted = this.formatTime(this.time)
    }
  },
  methods: {
    allowedStep: m => m % 15 === 0,
    formatDate (date) {
      if (!date) return null

      const [ year, month, day ] = date.split('-')
      return `${month}/${day}/${year}`
    },
    formatTime (time) {
      if(!time) return null

      const [ hours , mins ] = time.split(':')
      const tempDate = new Date();
      tempDate.setHours(hours, mins);
      return moment(tempDate).format('h:mm a')
    },
    parseDate (date) {
      if (!date) return null

      const [ month, day, year ] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    parseDate(date, time){
      const [ year, month, day ] = date.split('-')
      const [ hour, min ] = time.split(':')
      return new Date(year, month - 1, day, hour, min).toISOString();
    },
    async addEvent() {
      const { valid, name, band, featuring, venue, date, time, price, tix } = this;

      let event = {
        name, 
        band, 
        featuring: featuring && featuring.length > 0 ? featuring : [],
        venue,
        date: this.parseDate(date, time),
        price: parseFloat(price),
        tix
      }

      if (valid) {
        this.saving = true;
        await EventService.insertEvent(event);
        const events = await EventService.getEvents();
        this.saving = false;
        this.$emit("close");
        this.addEventClose(events);
      }
    },
    // not currently being used anywhere
    // async deleteEvent(id) {
    //   await EventService.deleteEvent(id);
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

  .bodyContainer {
    padding-top: 0px;
  }

  .footer {
    padding: 0;
    position: absolute;
    bottom: 0;

    .alertButton {
      margin: 0;
      border: none;
    }
  }
}
</style>

