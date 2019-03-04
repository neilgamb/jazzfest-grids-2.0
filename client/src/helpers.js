import { data } from "./assets/data";
import moment from "moment";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
const monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export function dayOfWeek(date) {
  return daysOfWeek[date.getDay()];
}

export function monthOfYear(date) {
  return monthsOfYear[date.getMonth()];
}

export function collateGrid(grid) {
  grid.map(gridItem => {
    let dates = [];

    gridItem.events.map(event => {
      dates.push(event.date);
    });

    let minDate = new Date(Math.min(...dates));

    if (minDate.getHours() <= 12) {
      minDate = moment(minDate).subtract(1, "days");
    }

    data.dates.map((date, i) => {
      if (moment(date.date).isSame(minDate, "day")) {
        gridItem.period = date.period;
        gridItem.day = i;
      }
    });
  });
  return grid;
}

export function autoComplete(input, venueUpdate){
  if(!input) return;

  const nolaBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(29.915024, -90.182380),
    new google.maps.LatLng(30.034468, -90.000310),
  );

  const options = {
    bounds: nolaBounds,
    strictBounds: true,
    types: ['establishment']
  };

  const dropdown = new google.maps.places.Autocomplete(input, options);

  dropdown.addListener('place_changed', () => {
    const place = dropdown.getPlace();
    venueUpdate(place);
  })

}