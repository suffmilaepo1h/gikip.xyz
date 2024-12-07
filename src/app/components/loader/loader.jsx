import React, { useEffect, useRef, useState } from "react";
import style from "./loader.module.css";

export default function Loader({ loading, handleClick }) {
  const ref = useRef();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (loading) {
    } else {
      ref.current.style.opacity = "0";
      setTimeout(() => {
        setShow(false);
      }, 2000);
    }
  }, [loading]);

  return (
    show && (
      <div className={style.loader} ref={ref}>
        <div className={style.loader__inner}>
          <h1>Gikip x Solana</h1>
          <h1 className={style.btn} onClick={handleClick}>
            Enter
          </h1>
        </div>
      </div>
    )
  );
}
