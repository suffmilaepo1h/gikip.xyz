import React, { useRef, useEffect, useState, useCallback } from "react";
import style from "./GikipSwitch.module.scss";
import classNames from "classnames";

const sounds = {
  evil: "/media/evil.mp3",
  good: "/media/good.mp3",
};

const descriptions = {
  good: "Good Gikip is a cute and charming egg with a shiny white shell, funny little eyes, and a big friendly smile.",
  evil: "Evil Gikip is a dark and aggressive egg with a shadowy shell, sinister eyes, and a gloomy aura.",
};

export default function GikipSwitch({ switchHandler }) {
  const evilGikipRef = useRef(null);
  const goodGikipRef = useRef(null);
  const abortControllerRef = useRef(null);

  const [activeDescription, setActiveDescription] = useState("");
  const [descriptionText, setDescriptionText] = useState("");

  const animateText = useCallback((text) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setDescriptionText("");
    let index = 0;

    function typeNextChar() {
      if (signal.aborted) return;
      if (index < text.length) {
        setDescriptionText(text.slice(0, index + 1));
        index++;
        setTimeout(typeNextChar, 50);
      }
    }

    typeNextChar();
  }, []);

  const handleMouseEnter = useCallback(
    (type) => {
      const audio = new Audio(sounds[type]);
      audio.play();

      setActiveDescription(type);
      animateText(descriptions[type]);
    },
    [animateText]
  );

  const handleMouseLeave = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setActiveDescription("");
    setDescriptionText("");
  }, []);

  useEffect(() => {
    const goodGikip = goodGikipRef.current;
    const evilGikip = evilGikipRef.current;

    if (goodGikip && evilGikip) {
      const handleGoodEnter = () => handleMouseEnter("good");
      const handleEvilEnter = () => handleMouseEnter("evil");

      goodGikip.addEventListener("mouseenter", handleGoodEnter);
      goodGikip.addEventListener("mouseleave", handleMouseLeave);
      evilGikip.addEventListener("mouseenter", handleEvilEnter);
      evilGikip.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        goodGikip.removeEventListener("mouseenter", handleGoodEnter);
        goodGikip.removeEventListener("mouseleave", handleMouseLeave);
        evilGikip.removeEventListener("mouseenter", handleEvilEnter);
        evilGikip.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [handleMouseEnter, handleMouseLeave]);

  return (
    <div className={style.gikipSwitch}>
      <div
        className={classNames(style.side, style.evil)}
        ref={evilGikipRef}
        onClick={() => switchHandler("evil")}
      >
        <h1>Evil Gikip</h1>
        <img src="/media/evil.png" alt="Evil Gikip" />
        {activeDescription === "evil" && (
          <p className={style.description}>{descriptionText}</p>
        )}
      </div>
      <div
        className={classNames(style.side, style.good)}
        ref={goodGikipRef}
        onClick={() => switchHandler("good")}
      >
        <h1>Good Gikip</h1>
        <img src="/media/good.png" alt="Good Gikip" />
        {activeDescription === "good" && (
          <p className={style.description}>{descriptionText}</p>
        )}
      </div>
    </div>
  );
}
