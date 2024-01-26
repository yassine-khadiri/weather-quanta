export const monthsOfYear: string[] = [
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
  "December",
];

export type SuggestType = {
  id: number;
  city: string;
  lat: number;
  lng: number;
  country: string;
  iso2: string;
};

export type WeatherImagesType = {
  main: string;
  description: {
    value: string;
    icons: string[];
  }[];
};

export const weatherImages = [
  {
    main: "Clear",
    description: [
      {
        value: "clear sky",
        icons: [
          "/assets/weather-icons/01d.png",
          "/assets/weather-icons/01n.png",
        ],
      },
    ],
  },
  {
    main: "Clouds",
    description: [
      {
        value: "few clouds",
        icons: [
          "/assets/weather-icons/02d.png",
          "/assets/weather-icons/02n.png",
        ],
      },
      {
        value: "scattered clouds",
        icons: ["/assets/weather-icons/03d.png"],
      },
      {
        value: "broken clouds",
        icons: ["/assets/weather-icons/04d.png"],
      },
      {
        value: "overcast clouds",
        icons: ["/assets/weather-icons/04d.png"],
      },
    ],
  },
  {
    main: "Drizzle",
    description: [
      {
        value: "light intensity drizzle",
        icons: ["/assets/weather-icons/09d.png"],
      },
      {
        value: "drizzle",
        icons: ["/assets/weather-icons/09d.png"],
      },
      {
        value: "heavy intensity drizzle",
        icons: ["/assets/weather-icons/09d.png"],
      },
      {
        value: "light intensity drizzle rain",
        icons: ["/assets/weather-icons/09d.png"],
      },
      {
        value: "drizzle rain",
        icons: ["/assets/weather-icons/09d.png"],
      },
      {
        value: "heavy intensity drizzle rain",
        icons: ["/assets/weather-icons/09d.png"],
      },
      {
        value: "shower rain and drizzle",
        icons: ["/assets/weather-icons/09d.png"],
      },
      {
        value: "heavy shower rain and drizzle",
        icons: ["/assets/weather-icons/09d.png"],
      },
      {
        value: "shower drizzle",
        icons: ["/assets/weather-icons/09d.png"],
      },
    ],
  },
  {
    main: "Rain",
    description: [
      {
        value: "light rain",
        icons: ["/assets/weather-icons/10d.png"],
      },
      {
        value: "moderate rain",
        icons: ["/assets/weather-icons/10d.png"],
      },
      {
        value: "heavy intensity rain",
        icons: ["/assets/weather-icons/10d.png"],
      },
      {
        value: "very heavy rain",
        icons: ["/assets/weather-icons/10d.png"],
      },
      {
        value: "extreme rain",
        icons: ["/assets/weather-icons/10d.png"],
      },
      {
        value: "freezing rain",
        icons: ["/assets/weather-icons/13d.png"],
      },
      {
        value: "light intensity shower rain",
        icons: ["/assets/weather-icons/09d.png"],
      },
      {
        value: "shower rain",
        icons: ["/assets/weather-icons/09d.png"],
      },
      {
        value: "heavy intensity shower rain",
        icons: ["/assets/weather-icons/09d.png"],
      },
      {
        value: "ragged shower rain",
        icons: ["/assets/weather-icons/09d.png"],
      },
    ],
  },
  {
    main: "Thunderstorm",
    description: [
      {
        value: "thunderstorm with light rain",
        icons: ["/assets/weather-icons/11d.png"],
      },
      {
        value: "thunderstorm with rain",
        icons: ["/assets/weather-icons/11d.png"],
      },
      {
        value: "thunderstorm with heavy rain",
        icons: ["/assets/weather-icons/11d.png"],
      },
      {
        value: "light thunderstorm",
        icons: ["/assets/weather-icons/11d.png"],
      },
      {
        value: "thunderstorm",
        icons: ["/assets/weather-icons/11d.png"],
      },
      {
        value: "heavy thunderstormn",
        icons: ["/assets/weather-icons/11d.png"],
      },
      {
        value: "ragged thunderstorm",
        icons: ["/assets/weather-icons/11d.png"],
      },
      {
        value: "thunderstorm with light drizzle",
        icons: ["/assets/weather-icons/11d.png"],
      },
      {
        value: "thunderstorm with drizzle",
        icons: ["/assets/weather-icons/11d.png"],
      },
      {
        value: "thunderstorm with heavy drizzle",
        icons: ["/assets/weather-icons/11d.png"],
      },
    ],
  },
  {
    main: "Snow",
    description: [
      {
        value: "light snow",
        icons: ["/assets/weather-icons/13d.png"],
      },
      {
        value: "snow",
        icons: ["/assets/weather-icons/13d.png"],
      },
      {
        value: "heavy snow",
        icons: ["/assets/weather-icons/13d.png"],
      },
      {
        value: "sleet",
        icons: ["/assets/weather-icons/13d.png"],
      },
      {
        value: "light shower sleet",
        icons: ["/assets/weather-icons/13d.png"],
      },
      {
        value: "shower sleet",
        icons: ["/assets/weather-icons/13d.png"],
      },
      {
        value: "light rain and snow",
        icons: ["/assets/weather-icons/13d.png"],
      },
      {
        value: "rain and snow",
        icons: ["/assets/weather-icons/13d.png"],
      },
      {
        value: "light shower snow",
        icons: ["/assets/weather-icons/13d.png"],
      },
      {
        value: "shower snow",
        icons: ["/assets/weather-icons/13d.png"],
      },
      {
        value: "heavy shower snow",
        icons: ["/assets/weather-icons/13d.png"],
      },
    ],
  },
  {
    main: "Mist",
    description: [
      {
        value: "mist",
        icons: ["/assets/weather-icons/50d.png"],
      },
    ],
  },
  {
    main: "Smoke",
    description: [
      {
        value: "smoke",
        icons: ["/assets/weather-icons/50d.png"],
      },
    ],
  },
  {
    main: "Haze",
    description: [
      {
        value: "haze",
        icons: ["/assets/weather-icons/50d.png"],
      },
    ],
  },
  {
    main: "Dust",
    description: [
      {
        value: "sand/dust whirls",
        icons: ["/assets/weather-icons/50d.png"],
      },
      {
        value: "dust",
        icons: ["/assets/weather-icons/50d.png"],
      },
    ],
  },
  {
    main: "Fog",
    description: [
      {
        value: "fog",
        icons: ["/assets/weather-icons/50d.png"],
      },
    ],
  },
  {
    main: "Sand",
    description: [
      {
        value: "sand",
        icons: ["/assets/weather-icons/50d.png"],
      },
    ],
  },
  {
    main: "Ash",
    description: [
      {
        value: "volcanic ash",
        icons: ["/assets/weather-icons/50d.png"],
      },
    ],
  },
  {
    main: "Squall",
    description: [
      {
        value: "squalls",
        icons: ["/assets/weather-icons/50d.png"],
      },
    ],
  },
  {
    main: "Tornado",
    description: [
      {
        value: "tornado",
        icons: ["/assets/weather-icons/50d.png"],
      },
    ],
  },
];
