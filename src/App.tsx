import "./App.css";
import { CiLocationOn } from "react-icons/ci";
import { GiWindsock, GiSunrise, GiSunset } from "react-icons/gi";
import { MdOutlineWaterDrop } from "react-icons/md";
import { IoHeartSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { FaTemperatureArrowUp, FaTemperatureArrowDown } from "react-icons/fa6";
import axios from "axios";
import { useEffect, useState } from "react";
import { monthsOfYear, weatherImages } from "./utils/data";

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
    const currentDate: Date = new Date(
      (timestamp + weatherData?.timezone) * 1000,
    );

    const prefix: string = currentDate.getUTCHours() >= 12 ? "PM" : "AM";
    const hours: number = currentDate.getUTCHours() % 12 || 12;
    return `${hours}:${currentDate.getUTCMinutes()} ${prefix}`;
  };

  const findAppropriateIcon = (): string => {
    // elem.description.map((elem) => {
    //   if (elem.icons.length > 1) {
    //     const dateByLocation: Date = new Date(
    //       (currentTimestamp + weatherData?.timezone) * 1000,
    //     );
    //     icon =
    //       dateByLocation.getUTCHours() <= 17
    //         ? elem.icons[0]
    //         : elem.icons[1];
    //   } else icon = elem.icons[0];
    // }),
    // );

    weatherImages
      .filter((elem) => {
        if (
          elem.main === weatherData?.weather[0].main &&
          elem.description.some(
            (elem) => elem.value === weatherData?.weather[0].description,
          )
        )
          return elem.description;
      })
      .map((elem) => {
        const matchingDescription = elem.description.find(
          (elem) => elem.value === weatherData?.weather[0].description,
        );

        console.log(matchingDescription);

        if (matchingDescription?.icons.length! > 1) {
          const dateByLocation: Date = new Date(
            (currentTimestamp + weatherData?.timezone) * 1000,
          );

          return dateByLocation.getUTCHours() <= 17
            ? matchingDescription?.icons[0]
            : matchingDescription?.icons[1];
        }
        return matchingDescription?.icons[0];
      });

    // for (let i = 0; i < weatherImages.length; i++) {
    //   if (weatherImages[i].main === weatherData?.weather[0].main) {
    //     let j = 0;
    //     for (j; j < weatherImages[i].description.length; j++) {
    //       if (
    //         weatherImages[i].description[j].value ===
    //         weatherData?.weather[0].description
    //       ) {
    //         if (weatherImages[i].description[j].icons.length > 1) {
    //           const dateByLocation: Date = new Date(
    //             (currentTimestamp + weatherData?.timezone) * 1000,
    //           );
    //           return dateByLocation.getUTCHours() <= 17
    //             ? weatherImages[i].description[j].icons[0]
    //             : weatherImages[i].description[j].icons[1];
    //         } else return weatherImages[i].description[j].icons[0];

    //         // console.log(weatherImages[i].description[j].icons[0]);
    //       }
    //     }
    //   }
    // }
    return "";
  };

  const [suggestion, setSuggestion] = useState<any>([]);

  const getSuggestedCities = async () => {
    try {
      const suggestedCites = await axios.get(
        `https://yassine-khadiri.github.io/world-cities/worldCities.json`,
      );
      setSuggestion(suggestedCites.data);
    } catch {
      console.log("Connot Get Suggested Cites!");
    }
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
    getLocationInfos();
  }, []);

  return (
    <div className="relative flex h-screen min-h-[850px] w-full flex-col items-center justify-center bg-[rgba(0,0,0,0.4)] bg-[url('./assets/cover.jpeg')] bg-cover bg-no-repeat py-8 bg-blend-darken">
      <div className="container flex h-full flex-col items-end justify-center gap-10">
        <div className="relative mr-2 w-[250px] rounded-xl min-[460px]:mr-0 min-[460px]:w-[300px]">
          <FaSearch className="absolute left-3 top-3 z-10" />
          <input
            type="text"
            placeholder="Search For A City"
            className="glassmorphism w-full px-10 py-2"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              getSuggestedCities();
              setHide(true);
            }}
          />
          {search.trim().length > 0 && hide && (
            <div className="glassmorphism absolute z-10 ml-5 mt-2 max-h-[200px] overflow-auto rounded-xl px-5 py-3 backdrop-blur-[13px] min-[460px]:max-h-[400px] min-[460px]:w-[280px]">
              {
                ((filtredCities = suggestion
                  .filter((elem: any) =>
                    elem.city
                      .toLowerCase()
                      .startsWith(search.trim().toLowerCase()),
                  )
                  .map((elem: any) => (
                    <div
                      key={elem.id}
                      className={`w-full cursor-pointer p-3 duration-300 ease-in-out hover:bg-[rgba(255,255,255,.3)]`}
                      onClick={(e) =>
                        getWeatherInfos(
                          e.currentTarget.querySelector("h2")?.textContent!,
                        )
                      }
                    >
                      <h2 className="font-[900]">{elem.city}</h2>
                      <span className="text-[10px]">{elem.country}</span>
                    </div>
                  ))),
                filtredCities.length > 0 ? filtredCities : "City Not Found!")
              }
            </div>
          )}
        </div>

        <div className="glassmorphism relative grid h-[60%] min-h-[680px] w-full select-none grid-cols-[minmax(0,auto)] grid-rows-[repeat(3,minmax(0,auto))] px-1 pb-5 pt-24 min-[460px]:items-end min-[460px]:px-5 lg:grid-cols-2">
          <span className="absolute right-10 top-10 text-xl">{`${day} ${monthsOfYear[month]}, ${year}`}</span>

          <div className="flex flex-col justify-center gap-10 p-5 text-5xl">
            <div className=" flex flex-col gap-4 text-5xl">
              <div className="flex items-center text-lg">
                <CiLocationOn className="text-3xl min-[1280px]:text-6xl" />
                <span
                  title="Location"
                  className="text-2xl min-[1280px]:text-5xl"
                >
                  {weatherData?.name || "-"}
                </span>
              </div>
              <div>
                <img
                  src={findAppropriateIcon()}
                  alt="weather icon"
                  className="h-[80px] min-[1280px]:h-[130px]"
                />
              </div>
              <span className="text-[20px] min-[1280px]:text-[40px]">
                {weatherData?.weather[0].description || "-"}
              </span>
            </div>
          </div>

          <div className="flex flex-col-reverse flex-wrap items-center justify-around border-l-2 border-white p-5 max-[1280px]:border-none min-[460px]:flex-row min-[460px]:gap-10">
            <div>
              <MdOutlineWaterDrop className="text-2xl min-[1280px]:text-4xl" />
              <span title="Humidity" className="ml-3 mt-1 inline-block">{`${
                Math.round(weatherData?.main.humidity) || "-"
              } %`}</span>
            </div>
            <div>
              <GiWindsock className="text-2xl min-[1280px]:text-4xl" />
              <span title="Wind Speed" className="ml-3 mt-1 inline-block">{`${
                Math.round(weatherData?.wind.speed) || "-"
              } m/s`}</span>
            </div>
            <div className="relative">
              <span
                className="mr-10 text-[100px] min-[1280px]:mr-20 min-[1280px]:text-[200px]"
                title="Temperature"
              >
                {`${Math.round(weatherData?.main.temp) || "-"}`}
              </span>
              <span className="absolute right-0 top-5 text-[40px] min-[1280px]:text-[80px]">
                °C
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-around gap-8 p-5 min-[1280px]:gap-24">
            <div>
              <GiSunrise className="text-2xl min-[1280px]:text-4xl" />
              <span className="ml-3">
                {getAmPmFormat(weatherData?.sys.sunrise) || "-"}
              </span>
            </div>
            <div className="">
              <GiSunset className="text-2xl min-[1280px]:text-4xl" />
              <span className="ml-3">
                {getAmPmFormat(weatherData?.sys.sunset) || "-"}
              </span>
            </div>
            <div className="">
              <FaTemperatureArrowUp className="text-2xl min-[1280px]:text-4xl" />
              <span className="ml-3">{`${
                Math.round(weatherData?.main.temp_min) || "-"
              } °C`}</span>
            </div>
            <div>
              <FaTemperatureArrowDown className="text-2xl min-[1280px]:text-4xl" />
              <span className="ml-3">{`${
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
