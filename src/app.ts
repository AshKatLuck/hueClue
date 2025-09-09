import * as cf from "../node_modules/color-2-name/lib/index.js";

const btnCheckColorName = document.getElementById(
  "btnCheckColorName"
) as HTMLButtonElement;
const showColor = document.querySelector(".showColor")! as HTMLDivElement;
const divColor1 = document.querySelector("#divColor1")! as HTMLDivElement;
const divColor2 = document.querySelector("#divColor2")! as HTMLDivElement;
const overDiv = document.getElementById("over")! as HTMLDivElement;
const btnColor1 = document.getElementById("color1")! as HTMLButtonElement;
const btnColor2 = document.getElementById("color2")! as HTMLButtonElement;
const btnCompare = document.getElementById("compare")! as HTMLButtonElement;

type ColorType = {
  name: string;
  color: string;
};

let color1: ColorType;
let color2: ColorType;

const getColor = async () => {
  if ("EyeDropper" in window) {
    console.log("EyeDropper is available");
  }
  let eyeDropper = new (window as any).EyeDropper();
  const colorSelectionResult = await eyeDropper.open();
  return colorSelectionResult.sRGBHex;
};

const assignColor1 = async () => {
  const color = await getColor();
  color1 = cf.closest(color);
  divColor1.style.backgroundColor = color;
};
const assignColor2 = async () => {
  const color = await getColor();
  color2 = cf.closest(color);
  divColor2.style.backgroundColor = color;
  console.log(color1, color2);
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
  console.log(closestColor);
  showColor.innerText = closestColor.name + " " + closestColor.color;
};

const compare = () => {
  // console.log(distance(splitRGB(color1.color), splitRGB(color2.color)));
  const rgbColor1 = splitRGB(color1.color) as [number, number, number];
  const rgbColor2 = splitRGB(color2.color) as [number, number, number];
  const dist = cf.distance(rgbColor1, rgbColor2);
  const width = `${Math.ceil((500 / 442) * dist)}px`;
  overDiv.style.width = width;
  console.log(dist, width);
};

btnCheckColorName.addEventListener("click", singleColorCheck);
btnColor1.addEventListener("click", assignColor1);
btnColor2.addEventListener("click", assignColor2);
btnCompare.addEventListener("click", compare);

console.log(cf.closest("#00FF88"));
