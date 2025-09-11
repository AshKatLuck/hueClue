import * as cf from "../node_modules/color-2-name/lib/index.js";
import { getColor, getTextColor, splitRGB } from "./getcolor.js";
import { initialColor, ColorType } from "./colortype.js";

const divColor1 = document.querySelector("#divColor1")! as HTMLDivElement;
const divColor2 = document.querySelector("#divColor2")! as HTMLDivElement;

const color1Name = document.getElementById(
  "color1Name"
)! as HTMLParagraphElement;
const color2Name = document.getElementById(
  "color2Name"
)! as HTMLParagraphElement;
const isRgb = document.getElementById("isRgb")! as HTMLInputElement;

const red = document.getElementById("red")! as HTMLParagraphElement;
const green = document.getElementById("green")! as HTMLParagraphElement;
const blue = document.getElementById("blue")! as HTMLParagraphElement;

const red1 = document.getElementById("red1")! as HTMLParagraphElement;
const green1 = document.getElementById("green1")! as HTMLParagraphElement;
const blue1 = document.getElementById("blue1")! as HTMLParagraphElement;

const red2 = document.getElementById("red2")! as HTMLParagraphElement;
const green2 = document.getElementById("green2")! as HTMLParagraphElement;
const blue2 = document.getElementById("blue2")! as HTMLParagraphElement;

const showColorDiv = document.querySelector("#showColorDiv")! as HTMLDivElement;
const pShowColor = showColorDiv.children[0]! as HTMLParagraphElement;
const progressBar = document.querySelector(".progress-bar")! as HTMLDivElement;

// type ColorType = {
//   name: string;
//   color: string;
// };

// const initialColor: ColorType = {
//   name: "beige",
//   color: "rgb(245,245,220)",
// };

let color1: ColorType = initialColor;
let color2: ColorType = initialColor;

let colorNumber: number[];
let colorNumber1: number[];
let colorNumber2: number[];

export const assignColor1 = async () => {
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

export const assignColor2 = async () => {
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

export const singleColorCheck = async () => {
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

export const compare = () => {
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

export const changeRgb = () => {
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
