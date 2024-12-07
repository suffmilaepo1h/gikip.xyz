"use client";
import style from "./page.module.css";
import BackgroundSky from "@/app/components/BackgroundSky";
import GoodConsole from "@/app/components/Console/GoodGikip";
import EvilConsole from "@/app/components/Console/EvilGikip";
import GikipSwitch from "@/app/components/GikipSwitch/GikipSwitch";
import { useEffect, useState } from "react";
import Loader from "./components/loader/loader";
import Footer from "./components/Footer/Footer";

const clickSounds = [
  "/media/click1.mp3",
  "/media/click2.mp3",
  "/media/click3.mp3",
];
const keyPressSounds = ["/media/keypress1.mp3"];

export default function Home() {
  const [currentGikip, setCurrentGikip] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLoading = () => {
    setLoading(!loading);
  };

  const handleChangeGikip = (gikip) => {
    setCurrentGikip(gikip);
  };
  useEffect(() => {
    const playRandomSound = () => {
      const randomIndex = Math.floor(Math.random() * clickSounds.length);
      const audio = new Audio(clickSounds[randomIndex]);
      audio.play();
    };
    const playKeyPressSound = async () => {
      const randomIndex = Math.floor(Math.random() * keyPressSounds.length);
      const audio = new Audio(keyPressSounds[randomIndex]);
      audio.play();
    };

    document.addEventListener("click", playRandomSound);
    document.addEventListener("keypress", playKeyPressSound);

    return () => {
      document.removeEventListener("click", playRandomSound);
      document.removeEventListener("keypress", playKeyPressSound);
    };
  }, []);

  return (
    <div className={style.Page}>
      <Loader loading={loading} handleClick={handleLoading} />
      <GikipSwitch switchHandler={handleChangeGikip} />

      {currentGikip === "good" && <GoodConsole />}
      {currentGikip === "evil" && <EvilConsole />}

      <BackgroundSky />

      <Footer />
    </div>
  );
}
