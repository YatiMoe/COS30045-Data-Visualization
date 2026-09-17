# Exercise 4.6 – Scaling charts

Replaces raw pixel values with D3 scales so the bar chart fits the SVG regardless of the data's range or the number of categories.

## Files
- `index.html` – same responsive SVG container, viewBox narrowed to `0 0 500 600` to force the chart to need scaling
- `css/style.css` – unchanged from Exercise 4.3
- `js/main.js` – adds an `xScale` (`d3.scaleLinear`, domain `[0, 1200]` → range `[0, 400]`) for bar width, and a `yScale` (`d3.scaleBand`, domain = brand names → range `[0, 600]`, with padding) for bar height/position; `barHeight`/`barSpacing` are no longer needed and were removed
- `data/tvBrandCount.csv` – same dataset as Exercise 4.4

## AI declaration
Generative AI (Claude, Anthropic) was used to help draft the scaling code following the exercise brief. The code was tested locally and reviewed before committing.

## Reference
Dufour, D., & Meeks, T. (2024). *D3.js in Action* (3rd ed.). Manning.

## Live Link
https://mercury.swin.edu.au/cos30045/s105972489/Exercise%204/Exercise%204.6/
