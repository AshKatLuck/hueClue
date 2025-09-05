if ('EyeDropper' in window) {
  console.log("EyeDropper is available");
}
 let eyeDropper = new EyeDropper();

    document.getElementById("eyedropperButton").addEventListener('click', e => {
        // Enter eyedropper mode
        eyeDropper.open()
        .then(colorSelectionResult => {
            // returns hex color value (#RRGGBB) of the selected pixel
            console.log(colorSelectionResult.sRGBHex);
        })
        .catch(error => {
            // handle the user choosing to exit eyedropper mode without a selection
        });
    });