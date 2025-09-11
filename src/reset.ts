const showColorDiv = document.querySelector("#showColorDiv")! as HTMLDivElement;
const pShowColor = showColorDiv.children[0]! as HTMLParagraphElement;

const red = document.getElementById("red")! as HTMLParagraphElement;
const green = document.getElementById("green")! as HTMLParagraphElement;
const blue = document.getElementById("blue")! as HTMLParagraphElement;

const red1 = document.getElementById("red1")! as HTMLParagraphElement;
const green1 = document.getElementById("green1")! as HTMLParagraphElement;
const blue1 = document.getElementById("blue1")! as HTMLParagraphElement;

const red2 = document.getElementById("red2")! as HTMLParagraphElement;
const green2 = document.getElementById("green2")! as HTMLParagraphElement;
const blue2 = document.getElementById("blue2")! as HTMLParagraphElement;

const color1Name = document.getElementById(
  "color1Name"
)! as HTMLParagraphElement;
const color2Name = document.getElementById(
  "color2Name"
)! as HTMLParagraphElement;

const progressBar = document.querySelector(".progress-bar")! as HTMLDivElement;

const divColor1 = document.querySelector("#divColor1")! as HTMLDivElement;
const divColor2 = document.querySelector("#divColor2")! as HTMLDivElement;

import { initialColor } from "./colortype.js";

export const resetColor = () => {
  pShowColor.innerText = "Color Name";
  pShowColor.style.color = "purple";
  showColorDiv.style.backgroundColor = initialColor.name;

  red.innerText = "";
  green.innerText = "";
  blue.innerText = "";
};

export const resetColors = () => {
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
