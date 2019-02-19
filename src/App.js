import React, { useState, useRef, useEffect } from "react";
import "./App.scss";

const App = () => {
  const PHI = (1 + Math.sqrt(5)) / 2;
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const maxRadius = width < height ? width : height;
  const pixelRatio = window.devicePixelRatio;
  const dw = Math.floor(pixelRatio * width);
  const dh = Math.floor(pixelRatio * height);
  const canvas = useRef(null);
  const style = { width, height, backgroundColor: "hsl(30, 100%, 98%)" };

  const onResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener("resize", onResize);
  });

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    ctx.save();
    ctx.scale(pixelRatio, pixelRatio);
    const center = { x: width / 2, y: height / 2 };
    let radius = 1;
    let quadrant = 1;
    while (radius < maxRadius) {
      ctx.beginPath();
      ctx.arc(
        center.x,
        center.y,
        radius,
        Math.PI * (0.5 * (quadrant - 1)),
        Math.PI * 0.5 * quadrant
      );
      ctx.stroke();
      switch (quadrant) {
        case 1:
          center.y -= radius * (PHI - 1);
          break;
        case 2:
          center.x += radius * (PHI - 1);
          break;
        case 3:
          center.y += radius * (PHI - 1);
          break;
        default:
          center.x -= radius * (PHI - 1);
      }
      console.log(center);
      radius *= PHI;
      quadrant = quadrant > 2 ? 0 : quadrant + 1;
    }
  }, [width, height]);

  return <canvas ref={canvas} width={dw} height={dh} style={style} />;
};

export default App;
