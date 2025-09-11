const alertDiv = document.getElementById("alert")! as HTMLDivElement;
export const getColor = async () => {
  if ("EyeDropper" in window) {
    let eyeDropper = new (window as any).EyeDropper();
    const colorSelectionResult = await eyeDropper.open();
    return colorSelectionResult.sRGBHex;
  } else {
    alertDiv.innerHTML = `<div class="alert alert-danger" role="alert">
  EyeDropper is not available in this browser. Try this page in the latest chrome browser
</div>`;
  }
};

export const getTextColor = (isDark: boolean) => {
  return isDark ? "white" : "black";
};

export function splitRGB(rgb: string): number[] {
  const stringnumbers = rgb.slice(4).slice(0, -1).split(",");
  let numbers;
  numbers = stringnumbers.map((n) => parseInt(n));
  return numbers;
}
