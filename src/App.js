import React, { useState, useRef, useEffect } from "react";
import "./App.scss";

const App = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
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
    const radius = width < height ? width / 2 : height / 2;
    const ctx = canvas.current.getContext("2d");
    ctx.save();
    ctx.scale(pixelRatio, pixelRatio);
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }, [width, height]);

  return <canvas ref={canvas} width={dw} height={dh} style={style} />;
};

export default App;
