import { venues } from "./venues.js";

export const data = {
  dates: [
    { date: new Date(2019, 3, 25), period: 0, day: 0 },
    { date: new Date(2019, 3, 26), period: 0, day: 1 },
    { date: new Date(2019, 3, 27), period: 0, day: 2 },
    { date: new Date(2019, 3, 28), period: 0, day: 3 },
    { date: new Date(2019, 3, 29), period: 1, day: 0 },
    { date: new Date(2019, 3, 30), period: 1, day: 1 },
    { date: new Date(2019, 4, 1), period: 1, day: 2 },
    { date: new Date(2019, 4, 2), period: 2, day: 0 },
    { date: new Date(2019, 4, 3), period: 2, day: 1 },
    { date: new Date(2019, 4, 4), period: 2, day: 2 },
    { date: new Date(2019, 4, 5), period: 2, day: 3 }
  ],
  grid: [
    {
      venue: venues["cafeIstanbul"],
      events: [
        {
          band: "Honey Island Swamp Band",
          featuring: [],
          date: new Date(2019, 3, 25, 22),
          doors: null,
          price: 25,
          tix: "https://www.brownpapertickets.com/event/4082197"
        },
        {
          band: "Golden Gate Wingmen",
          featuring: [
            "John Kadlecik",
            "Jeff Chimenti",
            "Reed Mathis",
            "Jay Lane"
          ],
          date: new Date(2019, 3, 26, 1, 30),
          doors: new Date(2019, 3, 25, 23, 59),
          price: 40,
          tix: "https://www.brownpapertickets.com/event/4048894"
        }
      ]
    },
    {
      venue: venues["maison"],
      events: [
        {
          band: "Stanton Moore Trio",
          featuring: ["Robert Walter, Will Bernard, DJ Doug Funnie"],
          date: new Date(2019, 3, 25, 22),
          doors: null,
          price: 25,
          tix:
            "https://wl.seetickets.us/event/STANTON-MOORE-TRIO-Stanton-Moore-Walter-Bernard-Maison/379630?afflky=BoomBoomRoom"
        }
      ]
    },
    {
      venue: venues["maison"],
      events: [
        {
          band: "The Rhythm Stompers",
          featuring: [],
          date: new Date(2019, 3, 26, 13),
          doors: null,
          price: null,
          tix: null
        },
        {
          band: "New Orleans Swinging Gypsies",
          featuring: [],
          date: new Date(2019, 3, 26, 16),
          doors: null,
          price: null,
          tix: null
        },
        {
          band: "Shotgun Jazz Band",
          featuring: [],
          date: new Date(2019, 3, 26, 19),
          doors: null,
          price: null,
          tix: null
        },
        {
          band: "Buena Vista Social Latin Dance Party",
          featuring: [],
          date: new Date(2019, 3, 26, 22),
          doors: null,
          price: null,
          tix: null
        }
      ]
    },
    {
      venue: venues["maison"],
      events: [
        {
          band: "Blue Plate Special",
          featuring: [
            "Will Bernard",
            "Stanton Moore",
            "John Medeski",
            "Andy Hess",
            "Skerik",
            "DJ Logic"
          ],
          date: new Date(2019, 3, 28, 1, 30),
          doors: new Date(2019, 3, 27, 23, 45),
          price: 35,
          ixx:
            "https://www.eventbrite.com/e/boom-boom-room-presents-blue-plate-special-tickets-55809445554"
        },
        {
          band: "Chance Bushman & The Ibervillianaires",
          featuring: [],
          date: new Date(2019, 3, 27, 13),
          doors: null,
          price: null,
          tix: null
        },
        {
          band: "Smokin' Time Jazz Club",
          featuring: [],
          date: new Date(2019, 3, 27, 19),
          doors: null,
          price: null,
          tix: null
        }
      ]
    }
  ]
};
