import "./App.css";
import { CiLocationOn } from "react-icons/ci";
import { GiWindsock, GiSunrise, GiSunset } from "react-icons/gi";
import { MdOutlineWaterDrop } from "react-icons/md";
import { RiCelsiusLine } from "react-icons/ri";
import { IoHeartSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { FaTemperatureArrowUp, FaTemperatureArrowDown } from "react-icons/fa6";
import axios from "axios";
import { useEffect, useState } from "react";
import { monthsOfYear, weatherImages } from "./utils/data";
import moroccoCities from "./utils/morocco-cities.json";

function App() {
  const currentTimestamp: number = Date.now();
  const currentDate: Date = new Date(currentTimestamp);
  const year: number = currentDate.getFullYear();
  const month: number = currentDate.getMonth();
  const day: number = currentDate.getDate();
  const [search, setSearch] = useState<string>("");
  const [hide, setHide] = useState<boolean | null>(null);
  const [weatherData, setWeatherData] = useState<any>();
  let filtredCities: JSX.Element[];

  const getAmPmFormat = (timestamp: number): string => {
    if (!timestamp) return "";
    const currentDate: Date = new Date((timestamp + ((weatherData?.timezone < 0 ? -1 : 1) * Math.abs(weatherData?.timezone))) * 1000);

    const prefix: string = currentDate.getUTCHours() >= 12 ? "PM" : "AM";
    const hours: number = currentDate.getUTCHours() % 12 || 12;
    return `${hours}:${currentDate.getUTCMinutes()} ${prefix}`;
  };

  // const daysOfWeek : string[] = [
  //   "Sunday",
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  // ];

  const findAppropriateIcon = (): string => {
    for (let i = 0; i < weatherImages.length; i++) {
      if (weatherImages[i].main === weatherData?.weather[0].main) {
        let j = 0;
        for (j; j < weatherImages[i].description.length; j++) {
          if (
            weatherImages[i].description[j].value ===
            weatherData?.weather[0].description
          ) {
            if (weatherImages[i].description[j].icons.length > 1) {
              const dateByLocation: Date = new Date((currentTimestamp + ((weatherData?.timezone < 0 ? -1 : 1) * Math.abs(weatherData?.timezone))) * 1000);
              return dateByLocation.getUTCHours() <= 17
                ? weatherImages[i].description[j].icons[0]
                : weatherImages[i].description[j].icons[1];
            } else return weatherImages[i].description[j].icons[0];

            // console.log(weatherImages[i].description[j].icons[0]);
          }
        }
      }
    }
    return "";
  };

  const getLocationInfos = async () => {
    try {
      const locationData = await axios.get(
        `https://ipinfo.io/json?token=${import.meta.env.VITE_IP_INFO_TOKEN}`,
      );

      getWeatherInfos(locationData.data.city);
    } catch {
      console.log("Connot Get Weather Infos!");
    }
  };

  const getWeatherInfos = async (location: string) => {
    setSearch(location);
    setHide(false);

    try {
      const latLongData = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }`,
      );

      const data = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${
          latLongData.data[0].lat
        }&lon=${latLongData.data[0].lon}&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&units=metric`,
      );
      setWeatherData(data.data);
    } catch {
      console.log("Connot Get Weather Infos!");
    }
  };

  useEffect(() => {
    // getLocationInfos();
  }, []);

  return (
    <div className="relative flex h-screen min-h-[1280px] w-full flex-col items-center justify-center bg-[url('./assets/cover.jpeg')] bg-cover bg-no-repeat">
      <div className="container flex h-full flex-col items-end justify-center gap-10">
        <div className="relative w-[300px] rounded-xl ">
          <FaSearch className="absolute left-3 top-3 z-10" />
          <input
            type="text"
            placeholder="Search For A City"
            className="glassmorphism w-[300px] px-10 py-2"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setHide(true);
            }}
          />
          {search.length > 0 && hide && (
            <div className="glassmorphism absolute z-10 mt-2 max-h-[400px] w-[300px] overflow-auto rounded-xl px-5 py-3 backdrop-blur-[13px]">
              {
                ((filtredCities = moroccoCities
                  .filter((el) =>
                    el.city
                      .toLowerCase()
                      .startsWith(search.trim().toLowerCase()),
                  )
                  .map((el) => (
                    <div
                      key={el.id}
                      className={`w-full cursor-pointer p-3 duration-300 ease-in-out hover:bg-[rgba(255,255,255,.3)]`}
                      onClick={(e) =>
                        getWeatherInfos((e.target as Node).textContent!)
                      }
                    >
                      {el.city}
                    </div>
                  ))),
                filtredCities.length > 0 ? filtredCities : "City Not Found!")
              }
            </div>
          )}
        </div>

        {/* <div className="glassmorphism relative flex h-[60%] w-full select-none items-center justify-around px-10 py-5"> */}
        <div className="glassmorphism relative grid h-[60%] w-full select-none grid-rows-3 px-10 py-5 min-[1280px]:grid-cols-2">
          <span className="absolute right-10 top-10 mr-3 text-xl">{`${day} ${monthsOfYear[month]}, ${year}`}</span>

          <div className="flex flex-col gap-10 bg-red-400 p-4 text-5xl">
            <div className="flex items-end gap-3">
              <CiLocationOn className="text-6xl" />
              <span title="Location" className="text-5xl">
                {weatherData?.name || "-"}
              </span>
            </div>
            <div className="flex flex-col">
              <div className="h-[130px] w-[150px] text-lg">
                {/* <img
                    src={`http://openweathermap.org/img/w/${weatherData?.weather[0].icon}.png`}
                    alt="weather icon"
                    className="w-full"
                  /> */}
                <img
                  src={findAppropriateIcon()}
                  alt="weather icon"
                  className="w-full"
                />
              </div>
              <span className="ml-1 mt-[35px] inline-block text-[40px]">
                {weatherData?.weather[0].description || "-"}
              </span>
            </div>
          </div>

          <div className="flex gap-5 border-l-2 border-white bg-green-300">
            <div className="-mb-24 flex items-center gap-3 px-5 text-2xl">
              <MdOutlineWaterDrop className="text-4xl" />
              <span title="Humidity">{`${
                Math.round(weatherData?.main.humidity) || "-"
              } %`}</span>
            </div>
            <div className="-mb-24 flex items-center gap-3 px-5 text-2xl">
              <GiWindsock className="text-4xl" />
              <span title="Wind Speed">{`${
                Math.round(weatherData?.wind.speed) || "-"
              } m/s`}</span>
            </div>
            <div className="relative px-5">
              <span className="mr-12 text-[200px]" title="Temperature">
                {Math.round(weatherData?.main.temp) || "-"}
              </span>
              <RiCelsiusLine className="absolute right-0 top-[60px] text-2xl text-[65px]" />
            </div>
          </div>

          {/* <div className="absolute bottom-10 flex h-[100px] w-[90%] items-center p-5 bg-blue-300"> */}
          <div className="flex items-center bg-blue-300 p-5">
            <div className=" min-[1280px]:w-[200px] ">
              <GiSunrise className="inline-block text-4xl" />
              <span className="ml-4">
                {getAmPmFormat(weatherData?.sys.sunrise) || "-"}
              </span>
            </div>
            <div className=" min-[1280px]:w-[200px] ">
              <GiSunset className="inline-block text-4xl" />
              <span className="ml-4">
                {getAmPmFormat(weatherData?.sys.sunset) || "-"}
              </span>
            </div>
            <div className="min-[1280px]:w-[200px] ">
              <FaTemperatureArrowUp className="inline-block text-4xl" />
              <span className="ml-4">{`${
                Math.round(weatherData?.main.temp_min) || "-"
              } °C`}</span>
            </div>
            <div className=" min-[1280px]:w-[200px] ">
              <FaTemperatureArrowDown className="inline-block text-4xl" />
              <span className="ml-4">{`${
                Math.round(weatherData?.main.temp_max) || "-"
              } °C`}</span>
            </div>
          </div>
        </div>
      </div>
      <footer className="p-4">
        Made With <IoHeartSharp className="inline-block text-red-500" /> By
        Yassine
      </footer>
    </div>
  );
}

export default App;
