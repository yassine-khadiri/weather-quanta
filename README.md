# Weather-Quanta

Weather-Quanta is a small weather web application built with ReactJS and Vite. It provides current weather information using the OpenWeatherMap API and IPInfo. Users can get accurate weather updates based on their location or a specified city.

## Features

- Displays current weather conditions, including temperature, humidity, wind speed, and more.
- Automatic location detection using IPInfo for a seamless user experience.
- Users can manually search for weather updates in specific cities.
- Clean and intuitive interface for easy navigation.

## Technologies Used

- React + TypeScript + Vite...
- OpenWeatherMap API for weather data ==> www.openweathermap.org/current
- IPInfo for automatic location detection ==> www.ipinfo.io
- JSON file hosted on GitHub for suggested cities ==> https://yassine-khadiri.github.io/world-cities/world-cities.json

## How to Use

1. Clone the repository to your local machine.
2. Obtain API keys for OpenWeatherMap and IPInfo.
3. Install dependencies: `npm install`
4. Uncomment and Replace (your_openweathermap_api_key && your_ipinfo_access_token) in .env file with yours, <br />
   To get: openweathermap_api_key ===> https://home.openweathermap.org/api_keys <br />
           ipinfo_access_token ===> https://ipinfo.io/account/home
6. Start the development server: `npm run dev`
7. Open your web browser and navigate to `http://localhost:5173`
