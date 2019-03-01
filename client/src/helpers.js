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
