import React, { useEffect, useRef, useState } from "react";
import style from "./BackgroundSky.module.scss";
const clouds = ["/media/cloud1.png", "/media/cloud2.png", "/media/cloud3.png"];

const CLOUD_WIDTH = 300;
const SUN_WIDTH = 250;
const CLOUD_STEP = 10;
export default function BackgroundSky() {
  const [cloudIndex, setCloudIndex] = useState(0);

  const cloudRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let cursorOffset = -CLOUD_WIDTH;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const interval = setInterval(() => {
      if (cloudRef.current) {
        cursorOffset += CLOUD_STEP;

        // Calculate cloud center
        const cloudCenter = cursorOffset + CLOUD_WIDTH / 2;
        const screenCenter = screenWidth / 2;

        // Calculate Y position
        const normalizedX = cursorOffset / screenWidth;
        const translateY = 50 * Math.sin(normalizedX * Math.PI);

        // Calculate scale based on distance from the screen center
        const distanceFromCenter = Math.abs(cloudCenter - screenCenter);
        const maxDistance = screenWidth / 2;
        const scale =
          0.5 +
          (1.3 - 0.5) * (1 - Math.min(distanceFromCenter / maxDistance, 1));
        const opacity = Math.min(scale, 1);

        cloudRef.current.style.transform = `translate(${cursorOffset}px, ${translateY}px) scale(${scale})`;
        cloudRef.current.style.opacity = opacity;
        cloudRef.current.style.transition = `all 0.1s linear`;

        // Change background brightness based on the cloud's position relative to the sun
        if (cursorOffset + CLOUD_WIDTH > screenWidth / 2 - SUN_WIDTH / 2) {
          let differenceBetweenCursorNSunLeftEdge =
            cursorOffset + CLOUD_WIDTH - (screenWidth / 2 - SUN_WIDTH / 2);

          if (cursorOffset + CLOUD_WIDTH > screenWidth / 2 + SUN_WIDTH / 2) {
            const brightness = differenceBetweenCursorNSunLeftEdge - SUN_WIDTH;

            containerRef.current.style.backgroundColor = `rgba(${brightness},${brightness},${brightness},1)`;
          } else {
            const brightness = SUN_WIDTH - differenceBetweenCursorNSunLeftEdge;

            containerRef.current.style.backgroundColor = `rgba(${brightness}, ${brightness}, ${brightness}, 1)`;
          }
        }

        // Reset cloud position and cycle through cloud images
        if (cursorOffset > screenWidth + CLOUD_WIDTH) {
          cloudRef.current.style.transform = null;
          cloudRef.current.style.transition = null;

          cursorOffset = -CLOUD_WIDTH;

          setCloudIndex((prev) => {
            if (prev + 1 === clouds.length) {
              return 0;
            } else {
              return prev + 1;
            }
          });
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [cloudRef]);

  return (
    <div ref={containerRef} className={style.container}>
      <div className={style.sun}>
        <img src="/media/sunn.png" width={SUN_WIDTH} alt="Sun" />
      </div>
      <div className={style.clouds}>
        <img
          ref={cloudRef}
          src={clouds[cloudIndex]}
          width={CLOUD_WIDTH}
          alt="Cloud"
        />
      </div>
    </div>
  );
}
