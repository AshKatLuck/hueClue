import * as cf from "../node_modules/color-2-name/lib/index.js";

const btnCheckColorName = document.getElementById(
  "btnCheckColorName"
)! as HTMLButtonElement;
// const showColor = document.querySelector(".showColor")! as HTMLDivElement;
const divColor1 = document.querySelector("#divColor1")! as HTMLDivElement;
const divColor2 = document.querySelector("#divColor2")! as HTMLDivElement;
// const overDiv = document.getElementById("over")! as HTMLDivElement;
const btnColor1 = document.getElementById("btnColor1")! as HTMLButtonElement;
const btnColor2 = document.getElementById("btnColor2")! as HTMLButtonElement;
// const btnCompare = document.getElementById("compare")! as HTMLButtonElement;

//modified for test.html
const showColorDiv = document.querySelector("#showColorDiv")! as HTMLDivElement;
const pShowColor = showColorDiv.children[0]! as HTMLParagraphElement;
const red = document.getElementById("red")! as HTMLParagraphElement;
const green = document.getElementById("green")! as HTMLParagraphElement;
const blue = document.getElementById("blue")! as HTMLParagraphElement;
const progressBar = document.querySelector(".progress-bar")! as HTMLDivElement;
const color1Name = document.getElementById(
  "color1Name"
)! as HTMLParagraphElement;
const color2Name = document.getElementById(
  "color2Name"
)! as HTMLParagraphElement;
const btnResetColor = document.getElementById(
  "btnResetColor"
)! as HTMLButtonElement;
const btnResetColors = document.getElementById(
  "btnResetColors"
)! as HTMLButtonElement;

const red1 = document.getElementById("red1")! as HTMLParagraphElement;
const green1 = document.getElementById("green1")! as HTMLParagraphElement;
const blue1 = document.getElementById("blue1")! as HTMLParagraphElement;

const red2 = document.getElementById("red2")! as HTMLParagraphElement;
const green2 = document.getElementById("green2")! as HTMLParagraphElement;
const blue2 = document.getElementById("blue2")! as HTMLParagraphElement;

const isRgb = document.getElementById("isRgb")! as HTMLInputElement;

const alertDiv = document.getElementById("alert")! as HTMLDivElement;

type ColorType = {
  name: string;
  color: string;
};

const initialColor: ColorType = {
  name: "beige",
  color: "rgb(245,245,220)",
};

let color1: ColorType = initialColor;
let color2: ColorType = initialColor;

let colorNumber: number[];
let colorNumber1: number[];
let colorNumber2: number[];

const getColor = async () => {
  if ("EyeDropper" in window) {
    // console.log("EyeDropper is available");

    let eyeDropper = new (window as any).EyeDropper();
    const colorSelectionResult = await eyeDropper.open();
    return colorSelectionResult.sRGBHex;
  } else {
    alertDiv.innerHTML = `<div class="alert alert-danger" role="alert">
  EyeDropper is not available in this browser. Try this page in the latest chrome browser
</div>`;
  }
};

const getTextColor = (isDark: boolean) => {
  return isDark ? "white" : "black";
};

const assignColor1 = async () => {
  const color = await getColor();
  color1 = cf.closest(color);
  // const dark = cf.isDark(color);
  let textColor = getTextColor(cf.isDark(color));
  // console.log(divColor1);

  divColor1.style.backgroundColor = color;
  color1Name.innerText = color1.name;
  color1Name.style.color = textColor;
  const rbgNumbers = splitRGB(color1.color);
  colorNumber1 = [...rbgNumbers];
  if (isRgb.checked) {
    red1.innerText = String(rbgNumbers[0]);
    green1.innerText = String(rbgNumbers[1]);
    blue1.innerText = String(rbgNumbers[2]);
  } else {
    red1.innerText = String(Math.ceil((rbgNumbers[0] / 255) * 100)) + "%";
    green1.innerText = String(Math.ceil((rbgNumbers[1] / 255) * 100)) + "%";
    blue1.innerText = String(Math.ceil((rbgNumbers[2] / 255) * 100)) + "%";
  }

  compare();
};

const assignColor2 = async () => {
  const color = await getColor();
  color2 = cf.closest(color);
  let textColor = getTextColor(cf.isDark(color));
  divColor2.style.backgroundColor = color;
  color2Name.innerText = color2.name;
  // console.log(color1, color2);
  color2Name.style.color = textColor;
  const rbgNumbers = splitRGB(color2.color);
  // red2.innerText = String(rbgNumbers[0]);
  // green2.innerText = String(rbgNumbers[1]);
  // blue2.innerText = String(rbgNumbers[2]);
  colorNumber2 = [...rbgNumbers];
  if (isRgb.checked) {
    red2.innerText = String(rbgNumbers[0]);
    green2.innerText = String(rbgNumbers[1]);
    blue2.innerText = String(rbgNumbers[2]);
  } else {
    console.log(rbgNumbers);
    red2.innerText = String(Math.ceil((rbgNumbers[0] / 255) * 100)) + "%";
    green2.innerText = String(Math.ceil((rbgNumbers[1] / 255) * 100)) + "%";
    blue2.innerText = String(Math.ceil((rbgNumbers[2] / 255) * 100)) + "%";
  }
  compare();
};

function splitRGB(rgb: string): number[] {
  const stringnumbers = rgb.slice(4).slice(0, -1).split(",");
  let numbers;
  numbers = stringnumbers.map((n) => parseInt(n));
  return numbers;
}

const singleColorCheck = async () => {
  const color = await getColor();
  const closestColor = cf.closest(color);
  // console.log(closestColor);
  // console.log(pShowColor);
  // showColorDiv.innerText = closestColor.name + " " + closestColor.color;
  const textColor = getTextColor(cf.isDark(color));
  pShowColor.innerText = closestColor.name;
  pShowColor.style.color = textColor;
  showColorDiv.style.backgroundColor = closestColor.name;
  const rbgNumbers = splitRGB(closestColor.color);
  colorNumber = [...rbgNumbers];
  if (isRgb.checked) {
    red.innerText = String(rbgNumbers[0]);
    green.innerText = String(rbgNumbers[1]);
    blue.innerText = String(rbgNumbers[2]);
  } else {
    red.innerText = String(Math.ceil((rbgNumbers[0] / 255) * 100)) + "%";
    green.innerText = String(Math.ceil((rbgNumbers[1] / 255) * 100)) + "%";
    blue.innerText = String(Math.ceil((rbgNumbers[2] / 255) * 100)) + "%";
  }
};

const compare = () => {
  // console.log(distance(splitRGB(color1.color), splitRGB(color2.color)));
  const rgbColor1 = splitRGB(color1.color) as [number, number, number];
  const rgbColor2 = splitRGB(color2.color) as [number, number, number];
  const dist = cf.distance(rgbColor1, rgbColor2);
  // const width = `${Math.ceil((500 / 442) * dist)}px`;
  const widthNumber = (1 - Math.ceil(dist) / 442) * 100;
  const width = `${widthNumber}%`;
  progressBar.style.width = width;
  progressBar.style.color = "white";
  progressBar.innerText = String(Math.ceil(widthNumber)) + "%";
  console.log(dist, width);
};

const resetColor = () => {
  pShowColor.innerText = "Color Name";
  pShowColor.style.color = "purple";
  showColorDiv.style.backgroundColor = initialColor.name;

  red.innerText = "";
  green.innerText = "";
  blue.innerText = "";
};

const resetColors = () => {
  divColor1.style.backgroundColor = initialColor.name;
  color1Name.innerText = "Color 1 Name";
  color1Name.style.color = "purple";
  divColor2.style.backgroundColor = initialColor.name;
  color2Name.innerText = "Color 2 Name";
  color2Name.style.color = "purple";
  const width = `0%`;
  progressBar.style.width = width;
  progressBar.innerText = "";
  red1.innerText = "";
  green1.innerText = "";
  blue1.innerText = "";
  red2.innerText = "";
  green2.innerText = "";
  blue2.innerText = "";
};

const changeRgb = () => {
  console.log("isRGB checked", isRgb.checked);
  if (isRgb.checked) {
    red.innerText = red.innerText ? String(colorNumber[0]) : "";
    red1.innerText = red1.innerText ? String(colorNumber1[0]) : "";
    red2.innerText = red2.innerText ? String(colorNumber2[0]) : "";

    green.innerText = green.innerText ? String(colorNumber[1]) : "";
    green1.innerText = green1.innerText ? String(colorNumber1[1]) : "";
    green2.innerText = green2.innerText ? String(colorNumber2[1]) : "";

    blue.innerText = blue.innerText ? String(colorNumber[2]) : "";
    blue1.innerText = blue1.innerText ? String(colorNumber1[2]) : "";
    blue2.innerText = blue2.innerText ? String(colorNumber2[2]) : "";
  } else {
    red.innerText = red.innerText
      ? String(Math.ceil((colorNumber[0] / 255) * 100)) + "%"
      : "";
    red1.innerText = red1.innerText
      ? String(Math.ceil((colorNumber1[0] / 255) * 100)) + "%"
      : "";
    red2.innerText = red2.innerText
      ? String(Math.ceil((colorNumber2[0] / 255) * 100)) + "%"
      : "";

    green.innerText = green.innerText
      ? String(Math.ceil((colorNumber[1] / 255) * 100)) + "%"
      : "";
    green1.innerText = green1.innerText
      ? String(Math.ceil((colorNumber1[1] / 255) * 100)) + "%"
      : "";
    green2.innerText = green2.innerText
      ? String(Math.ceil((colorNumber2[1] / 255) * 100)) + "%"
      : "";

    blue.innerText = blue.innerText
      ? String(Math.ceil((colorNumber[2] / 255) * 100)) + "%"
      : "";
    blue1.innerText = blue1.innerText
      ? String(Math.ceil((colorNumber1[2] / 255) * 100)) + "%"
      : "";
    blue2.innerText = blue2.innerText
      ? String(Math.ceil((colorNumber2[2] / 255) * 100)) + "%"
      : "";
  }
};

btnCheckColorName.addEventListener("click", singleColorCheck);
btnColor1.addEventListener("click", assignColor1);
btnColor2.addEventListener("click", assignColor2);
btnResetColor.addEventListener("click", resetColor);
btnResetColors.addEventListener("click", resetColors);

isRgb.addEventListener("change", changeRgb);

console.log(cf.closest("#00FF88"));
