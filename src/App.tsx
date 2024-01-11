import "./App.css";
import { CiLocationOn } from "react-icons/ci";
// import { FaCloud } from "react-icons/fa6";
import { GiWindsock } from "react-icons/gi";
import { MdOutlineWaterDrop } from "react-icons/md";
import { RiCelsiusLine } from "react-icons/ri";
import axios from "axios";
import { useEffect, useState } from "react";
import { monthsOfYear, weatherImages } from "./utils/data";
// import moroccoCities from "./utils/morocco-cities.json";

function App() {
  const currentTimestamp: number = Date.now();
  const currentDate: Date = new Date(currentTimestamp);
  const year: number = currentDate.getFullYear();
  const month: number = currentDate.getMonth();
  const day: number = currentDate.getDate();
  const [locationInfos, setLocationInfos] = useState<any>("");

  const [weatherData, setWeatherData] = useState<any>();

  // const daysOfWeek : string[] = [
  //   "Sunday",
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  // ];

  // const [moroccoCities, setMoroccoCities] = useState<{ city: string }[]>([]);


  // const getMoroccoCites = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.value.trim().length)
  //     setMoroccoCities(() => moroccoCities.map((elem) => elem.city));
  //   else setMoroccoCities([]);
  // };

  const findAppropriateIcon = (): string => {
    for (let i = 0; i < weatherImages.length; i++) {
      if (weatherImages[i].main === weatherData?.weather[0].main) {
        let j = 0;
        for (j; j < weatherImages[i].description.length; j++) {
          if (
            weatherImages[i].description[j].value ===
            weatherData?.weather[0].description
          ) {
            console.log(weatherImages[i].description[j].icons[0]);
            return weatherImages[i].description[j].icons[0];
          }
        }
      }
    }
    return "";
  };

  const getWeatherData = async () => {
    try {
      const locationData = await axios.get(
        `https://ipinfo.io/json?token=${import.meta.env.VITE_IP_INFO_TOKEN}`,
      );

      setLocationInfos(locationData.data);

      const latLongData = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${
          locationData.data.city
        }&appid=${import.meta.env.VITE_WEATHER_API_KEY}`,
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
      console.log("Connot Get Location Infos!");
    }
  };

  useEffect(() => {
    getWeatherData();
  }, []);

  // city: "Khouribga";
  // country: "MA";
  // ip: "197.230.30.146";
  // loc: "32.8811,-6.9063";
  // org: "AS36925 MEDITELECOM";
  // postal: "25100";
  // region: "Béni Mellal-Khénifra";
  // timezone: "Africa/Casablanca";

  return (
    <>
      {/* {console.log(weatherData.weather)} */}
      <div className="relative flex h-screen w-full items-center justify-center bg-[url('./assets/cover.jpeg')] bg-cover bg-no-repeat">
        <div className="container flex h-full flex-col items-end justify-center gap-10">
          <div className="relative w-[300px] rounded-xl">
            <input
              type="text"
              placeholder="Search For A City"
              className="glassmorphism w-[300px] px-5 py-2"
              // onChange={(e) => getMoroccoCites(e)}
            />
            {/*<div className="glassmorphism backdr absolute z-10 mt-2 w-[300px] rounded-xl px-5 py-3 backdrop-blur-[13px]">
              <div className="w-full cursor-pointer p-3 duration-300 ease-in-out hover:bg-[rgba(255,255,255,.3)]">
                hello
              </div>
              <div className="w-full cursor-pointer p-3 duration-300 ease-in-out hover:bg-[rgba(255,255,255,.3)]">
                hello
              </div>
              <div className="w-full cursor-pointer p-3 duration-300 ease-in-out hover:bg-[rgba(255,255,255,.3)]">
                hello
              </div>
              <div className="w-full cursor-pointer p-3 duration-300 ease-in-out hover:bg-[rgba(255,255,255,.3)]">
                hello
              </div>
              <div className="w-full cursor-pointer p-3 duration-300 ease-in-out hover:bg-[rgba(255,255,255,.3)]">
                hello
              </div>
              <div className="w-full cursor-pointer p-3 duration-300 ease-in-out hover:bg-[rgba(255,255,255,.3)]">
                hello
              </div>
            </div>*/}
          </div>
          <div className="glassmorphism relative flex h-[60%] w-full items-center justify-around px-10 py-5">
            <span className="absolute right-10 top-10 mr-3 text-xl">{`${day} ${monthsOfYear[month]}, ${year}`}</span>
            <div className="flex flex-col gap-10 p-4 text-5xl">
              <div className="flex items-end gap-3">
                <CiLocationOn className="text-6xl" />
                <span className="text-5xl">{locationInfos?.city || "-"}</span>
              </div>
              <div className="flex flex-col">
                {/* <FaCloud className="text-[150px]" /> */}
                <div className="h-[130px] w-[150px] text-[150px]">
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
                  Cloudy
                </span>
              </div>
            </div>

            <div className="flex h-fit gap-5 border-l-2 border-white">
              <div className="-mb-24 flex items-center gap-3 px-5 text-2xl">
                <MdOutlineWaterDrop className="text-4xl" />
                <span>{`${
                  Math.round(weatherData?.main.humidity) || "-"
                } %`}</span>
              </div>
              <div className="-mb-24 flex items-center gap-3 px-5 text-2xl">
                <GiWindsock className="text-4xl" />
                <span>{`${
                  Math.round(weatherData?.wind.speed) || "-"
                } m/s`}</span>
              </div>
              <div className="relative px-5">
                <span className="mr-14 text-[200px]">
                  {Math.round(weatherData?.main.temp) || "-"}
                </span>
                <RiCelsiusLine className="absolute bottom-[75px] right-0 text-2xl text-[65px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
