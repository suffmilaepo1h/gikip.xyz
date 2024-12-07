"use client";

import React, { useState } from "react";
import style from "./Footer.module.scss";
import classNames from "classnames";
import arrowUp from "@/../public/media/arrowUp.svg";
import dynamic from "next/dynamic";

const MediaKit = dynamic(() => import("@/app/components/MediaKit/MediaKit"), {
  ssr: true,
  loading: () => <p>Loading...</p>,
});

export default function Footer() {
  const [opened, setOpened] = useState(false);

  return (
    <div className={classNames(style.Footer, opened && style.opened)}>
      {!opened && (
        <div className={style.opener} onClick={() => setOpened(!opened)}>
          <h1>Media</h1>
          <img src={arrowUp.src} alt="arrow up" />
          <h1>Info</h1>
        </div>
      )}

      {opened && (
        <div className={style.content}>
          <h1>Gikip x Solana</h1>
          <MediaKit />
          <img
            onClick={() => setOpened(!opened)}
            style={{ rotate: "180deg", cursor: "pointer" }}
            src={arrowUp.src}
            alt="arrow up"
          />
        </div>
      )}
    </div>
  );
}
