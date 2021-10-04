import { useRef, useState } from "react";
import "./App.css";

let x;
let y;
let color = "black";
let isPressed = false;
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight - 100;

const App = () => {
  const canvasRef = useRef();
  const [strokeSize, setStrokeSize] = useState(1);

  const drawCircle = (x, y) => {
    let ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.arc(x, y, strokeSize, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  };

  const drawLine = (x1, y1, x2, y2) => {
    let ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = strokeSize * 2;
    ctx.stroke();
  };

  const mouseDownHandler = (e) => {
    isPressed = true;
    x = e.nativeEvent.offsetX;
    y = e.nativeEvent.offsetY;
  };

  const mouseUpHandler = (e) => {
    isPressed = false;
    x = null;
    y = null;
  };

  const mouseMoveHandler = (e) => {
    if (isPressed) {
      const x2 = e.nativeEvent.offsetX;
      const y2 = e.nativeEvent.offsetY;

      drawCircle(x2, y2);
      drawLine(x, y, x2, y2);

      x = x2;
      y = y2;
    }
  };

  const colorChangeHandler = (e) => {
    color = e.target.value;
  };

  const clearCanvasHandler = () => {
    let ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const decreaseHandler = () => {
    if (strokeSize > 1) {
      setStrokeSize((strokeSize) => strokeSize - 1);
    }
  };

  const increaseHandler = () => {
    setStrokeSize((strokeSize) => strokeSize + 1);
  };

  return (
    <>
      <div className="toolbox">
        <div className="size-btn-grp">
          <button type="button" onClick={decreaseHandler}>
            -
          </button>
          <span className="stroke-size">{strokeSize}</span>
          <button type="button" onClick={increaseHandler}>
            +
          </button>
        </div>
        <input type="color" onChange={colorChangeHandler} />
        <button type="button" onClick={clearCanvasHandler}>
          Clear
        </button>
      </div>
      <canvas
        width={canvasWidth}
        height={canvasHeight}
        ref={canvasRef}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        onMouseMove={mouseMoveHandler}
      ></canvas>
    </>
  );
};

export default App;
