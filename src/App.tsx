import "./App.css";
import { CiLocationOn } from "react-icons/ci";
import { FaCloud } from "react-icons/fa6";
import { GiWindsock } from "react-icons/gi";
import { MdOutlineWaterDrop } from "react-icons/md";
import { RiCelsiusLine } from "react-icons/ri";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const currentTimestamp: number = Date.now();
  const currentDate: Date = new Date(currentTimestamp);
  const year: number = currentDate.getFullYear();
  const month: number = currentDate.getMonth();
  const day: number = currentDate.getDate();

  // const daysOfWeek : string[] = [
  //   "Sunday",
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  // ];

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
    "December",
  ];

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=cb2eca08845cfae37d80b7db6744e510`,
      );

      console.log(data.data);
    };
    getData();
  }, []);

  return (
    <>
      <div className="relative flex h-screen w-full items-center justify-center bg-[url('./assets/cover.jpeg')] bg-cover bg-no-repeat">
        <div className="container flex h-full flex-col items-end justify-center gap-10">
          <input
            type="text"
            placeholder="Search For A Country"
            className="glassmorphism w-[300px] px-5 py-2"
          />
          <div className="glassmorphism relative flex h-[60%] w-full items-center justify-around px-10 py-5">
            <span className="absolute right-10 top-10 mr-3 text-xl">{`${day} ${monthsOfYear[month]}, ${year}`}</span>
            <div className="flex flex-col gap-10 p-4 text-5xl">
              <div className="flex items-end gap-3">
                <CiLocationOn className="text-6xl" />
                <span className="text-5xl">Azemmour</span>
              </div>
              <div className="flex flex-col">
                <FaCloud className="text-[150px]" />
                <span className="-mt-[15px] ml-1 inline-block text-[40px]">
                  Cloudy
                </span>
              </div>
            </div>

            <div className="flex h-fit gap-5 border-l-2 border-white">
              <div className="-mb-24 flex items-center gap-3 px-5 text-2xl">
                <MdOutlineWaterDrop className="text-4xl" />
                <span>10%</span>
              </div>
              <div className="-mb-24 flex items-center gap-3 px-5 text-2xl">
                <GiWindsock className="text-4xl" />
                <span>10m/s</span>
              </div>
              <div className="relative px-5">
                <span className="mr-14 text-[200px]">10</span>
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
