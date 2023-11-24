"use client";
import { cn } from "@/lib/utils";
import { VolumeX, Volume2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";

export default function Home() {
  const [days, setDays] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeChange, setTimeChange] = useState(false);
  const [muted, setMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const countdown = () => {
    const now = new Date().getTime();
    const endDate = new Date("December 24, 2023 00:00:00").getTime();
    const timeDiff = endDate - now;

    const seconds = 1000;
    const minutes = seconds * 60;
    const hours = minutes * 60;
    const days = hours * 24;
    const daysLeft = Math.floor(timeDiff / days);
    const hoursLeft = Math.floor((timeDiff % days) / hours);
    const minutesLeft = Math.floor((timeDiff % hours) / minutes);
    const secondsLeft = Math.floor((timeDiff % minutes) / seconds);
    if (timeChange === true) {
      setTimeChange(false);
    } else {
      setTimeChange(true);
    }

    setDays(daysLeft);
    setHours(hoursLeft);
    setMinutes(minutesLeft);
    setSeconds(secondsLeft);
  };
  useEffect(() => {
    setTimeout(countdown, 1000);
  }, [days, hours, minutes, seconds, timeChange]);

  const handleClick = () => {
    setMuted(!muted);
    setIsPlaying(!isPlaying);
  };
  return (
    <main>
      <div className="w-[100vw] h-[100vh] z-[-1] fixed ">
        <ReactPlayer url="/christmas-song.mp3" playing={isPlaying} loop />
        <Image
          alt="The beautiful nature covered in snow and some deers and mountains on the background"
          layout="fill"
          src={"/christmas.jpg"}
          objectFit="cover"
        ></Image>
      </div>
      <div className="flex  items-center justify-center">
        <Image
          src={"/christmas-logo.png"}
          alt="logo"
          width={300}
          height={20}
        ></Image>
        <div
          role="button"
          onClick={handleClick}
          className="absolute right-4 top-5"
        >
          {muted ? (
            <VolumeX className="h-10 w-10 text-white"></VolumeX>
          ) : (
            <Volume2 className="h-10 w-10 text-white"></Volume2>
          )}
        </div>
      </div>

      <div className="mx-[25%] gap-10 justify-center py-20 flex flex-wrap items-center">
        <div className="text-center items-center flex-row">
          <div
            className={cn(
              `  bg-white/20  text-white shadow-lg font-bold text-6xl flex  items-center justify-center bg-white/20 border-[4px] border-white rounded-[15%] w-[150px] h-[150px]`
            )}
          >
            {days}
          </div>
          <p className="text-white font-bold pt-5 text-2xl">DAYS</p>
        </div>

        <div className="text-center items-center flex-row">
          <div
            className={cn(
              `  bg-white/20  text-white shadow-lg font-bold text-6xl flex flex-1 items-center justify-center bg-white/20 border-[4px] border-white rounded-[15%] w-[150px] h-[150px]`
            )}
          >
            {hours}
          </div>
          <p className="text-white font-bold pt-5 text-2xl">HOURS</p>
        </div>

        <div className="text-center items-center flex-row">
          <div
            className={cn(
              `  bg-white/20  text-white shadow-lg font-bold text-6xl flex flex-1 items-center justify-center bg-white/20 border-[4px] border-white rounded-[15%] w-[150px] h-[150px]`
            )}
          >
            {minutes}
          </div>
          <p className="text-white font-bold pt-5 text-2xl">MINUTES</p>
        </div>

        <div className="text-center items-center flex-row">
          <div
            className={cn(
              `  bg-white/20  shadow-lg font-bold text-6xl transition duration-100 flex flex-1 items-center justify-center bg-white/20 border-[4px]  border-white rounded-[15%] w-[150px] h-[150px]`,
              { "text-[5rem] transtion ease-in duration-100": timeChange }
            )}
          >
            <p className="text-red-600 drop-shadow-xl transition easy-in-out duration-150">
              {" "}
              {seconds}{" "}
            </p>
          </div>
          <p className="pt-5 text-2xl font-bold text-white">SECONDS</p>
        </div>
      </div>
    </main>
  );
}
