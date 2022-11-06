import { useState } from "react";

const colors = ["red", "green", "yellow", "black", "blue"];

export default function CanvasDrawer() {
  let canvasRef = null;
  let ctx = null;

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [mouseDown, setMouseDown] = useState(false);
  const [lastPosition, setPosition] = useState({
    x: 0,
    y: 0
  });

  const draw = (x, y) => {
    if (mouseDown.value) {
      ctx.beginPath();
      ctx.strokeStyle = selectedColor.value;
      ctx.lineWidth = 5;
      ctx.lineJoin = "round";
      ctx.moveTo(lastPosition.value.x, lastPosition.value.y);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.stroke();

      setPosition({
        x,
        y
      });
    }
  };

  const download = async () => {
    const image = canvasRef.toDataURL("image/png");
    const blob = await (await fetch(image)).blob();
    const blobURL = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobURL;
    link.download = "image.png";
    link.click();
  };

  const clear = () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const onMouseDown = (e) => {
    setPosition({
      x: e.pageX,
      y: e.pageY
    });
    setMouseDown(true);
  };

  const onMouseUp = (e) => setMouseDown(false);
  const onMouseMove = (e) => draw(e.pageX, e.pageY);

  return (
    <div>
      <canvas
        style={{
          border: "1px solid #000"
        }}
        width={400}
        height={400}
        ref={(e) => {
          canvasRef = e;
          ctx = e.getContext("2d");
        }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
      />
      <br />
      <select
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
      >
        {colors.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>
      <button onClick={clear}>Clear</button>
      <button onClick={download}>Download</button>
    </div>
  );
}
