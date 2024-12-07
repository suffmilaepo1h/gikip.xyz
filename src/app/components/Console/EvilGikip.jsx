import React, { useEffect, useRef, useState } from "react";
import style from "./style.module.css";
import classNames from "classnames";
import { prompt } from "@/actions/prompt";

const START_MESSAGE = `Be careful, gikip is evil`;

export default function GoodConsole() {
  const consoleRef = useRef(null);
  const contentRef = useRef(null);
  const isDragging = useRef(false);
  const startPosition = useRef({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [inputValue, setInputValue] = useState("");

  const [responding, setResponding] = useState(false);

  const submitPrompt = async () => {
    const audio = new Audio("/media/respond.mp3");
    audio.volume = 0.5;
    audio.play().catch((e) => console.error(e));

    setResponding(true);
    appendToConsole(
      `<p class="${classNames(style.consoleText)}">${"> " + inputValue}</p>`
    );
    setInputValue("");

    const response = await prompt(inputValue, true);
    setResponding(false);

    contentRef.current.scrollTop = contentRef.current.scrollHeight;

    appendToConsole(
      `<p class="${classNames(
        style.consoleText,
        style.response
      )}">${response}</p>`
    );
  };

  const appendToConsole = (text) => {
    contentRef.current.innerHTML += text;
  };

  const handleEnterKey = (e) => {
    if (responding) return;
    if (e.key === "Enter") {
      submitPrompt();
    }
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    const rect = consoleRef.current.getBoundingClientRect();
    startPosition.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;

    const newX = e.clientX - startPosition.current.x;
    const newY = e.clientY - startPosition.current.y;

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={consoleRef}
      className={classNames(style.console, style.evil)}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        position: "absolute",
      }}
    >
      <div
        className={classNames(style.topbar)}
        onMouseDown={handleMouseDown}
        style={{
          cursor: "grab",
          padding: "5px",
          textAlign: "center",
        }}
      >
        EvilGikip {responding ? "(responding)" : ""}
      </div>
      <div className={style.consoleContent} ref={contentRef}>
        <p className={style.consoleText}>{START_MESSAGE}</p>
      </div>
      <div className={style.inputContainer}>
        <input
          className={style.consoleInput}
          value={inputValue}
          onKeyDown={handleEnterKey}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
    </div>
  );
}
