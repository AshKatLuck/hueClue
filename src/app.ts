import * as cf from "../node_modules/color-2-name/lib/index.js";

const div = document.querySelector(".container")! as HTMLDivElement;
div.innerHTML = `<h1>Hi from Typescript</h1>`;
console.log(cf.closest("#00FF88"));
