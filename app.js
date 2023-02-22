const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.getElementById("line-width");
const color = document.getElementById("color");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);

const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const fontSize = document.getElementById("font-size-box");
const saveImg = document.getElementById("save");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

const colors = [
  "#55efc4",
  "#81ecec",
  "#74b9ff",
  "#a29bfe",
  "#d63031",
  "#fdcb6e",
  "#0984e3",
  "#00cec9",
  "#00b894",
];

let isPainting = false;

function onMouseUp() {
  isPainting = false;
  ctx.beginPath();
}

function onMouseDown(event) {
  isPainting = true;
  ctx.moveTo(event.offsetX, event.offsetY);
}

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
}

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
  console.log(colorValue);
}

function onModeClick() {
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onDestroyClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = color.value;
}

function onEraserClick() {
  ctx.strokeStyle = "white";
  ctx.fillStyle = "white";
  color.value = "#ffffff";
}

function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
}

function onDoubleClick(event) {
  const text = textInput.value;
  if (text !== "") {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = String(fontSize.value + "px" + " serif");
    console.log(fontSize.value);
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.strokeText(text, event.offsetX, event.offsetY + 60);
    ctx.restore();
  }
}

function onSaveImage() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
document.addEventListener("mouseup", onMouseUp);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
canvas.addEventListener("dblclick", onDoubleClick);
saveImg.addEventListener("click", onSaveImage);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

// ctx.rect(50, 50, 100, 100);
// ctx.rect(150, 150, 100, 100);
// ctx.rect(250, 250, 100, 100);
// ctx.fill();

// ctx.beginPath();
// ctx.rect(350, 350, 100, 100);
// ctx.rect(450, 450, 100, 100);
// ctx.fillStyle = "red";
// ctx.fill();

// ctx.fillRect(200, 200, 50, 200);
// ctx.fillRect(400, 200, 50, 200);
// ctx.lineWidth = 2;
// ctx.fillRect(300, 300, 50, 100);
// ctx.fillRect(200, 200, 200, 20);

// ctx.moveTo(200, 200);
// ctx.lineTo(325, 100);
// ctx.lineTo(450, 200);
// ctx.stroke();
// ctx.fill();

// ctx.fillRect(200, 200, 15, 100);
// ctx.fillRect(257.5, 200, 60, 200);
// ctx.fillRect(360, 200, 15, 100);
// ctx.arc(285, 150, 40, 0, 2 * Math.PI);
// ctx.fill();

// ctx.beginPath();
// ctx.fillStyle = "white";
// ctx.arc(265, 142, 8, 0, 1 * Math.PI);
// ctx.arc(295, 142, 8, 0, 1 * Math.PI);
// ctx.fill();
