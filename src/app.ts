import { resetColor, resetColors } from "./reset.js";
import {
  assignColor1,
  assignColor2,
  singleColorCheck,
  changeRgb,
} from "./assigncolor.js";

const btnCheckColorName = document.getElementById(
  "btnCheckColorName"
)! as HTMLButtonElement;

const btnColor1 = document.getElementById("btnColor1")! as HTMLButtonElement;
const btnColor2 = document.getElementById("btnColor2")! as HTMLButtonElement;

const btnResetColor = document.getElementById(
  "btnResetColor"
)! as HTMLButtonElement;
const btnResetColors = document.getElementById(
  "btnResetColors"
)! as HTMLButtonElement;

const isRgb = document.getElementById("isRgb")! as HTMLInputElement;

btnCheckColorName.addEventListener("click", singleColorCheck);
btnColor1.addEventListener("click", assignColor1);
btnColor2.addEventListener("click", assignColor2);
btnResetColor.addEventListener("click", resetColor);
btnResetColors.addEventListener("click", resetColors);

isRgb.addEventListener("change", changeRgb);
