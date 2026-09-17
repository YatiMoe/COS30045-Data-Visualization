# Exercise 4.5 – D3 binding and drawing with data

Binds the TV brand data to `<rect>` elements to draw a first bar chart, one bar per brand.

## Files
- `index.html` – same responsive SVG container as Exercise 4.3–4.4
- `css/style.css` – unchanged from Exercise 4.3
- `js/main.js` – loads `tvBrandCount.csv`, then `drawBarChart(data)` binds it to `<rect>`s (`.selectAll("rect").data(data).join("rect")`) and sets `width` from `d.count`, a fixed `height`, `fill`, and `x`/`y` (spaced out by index) to lay out the bars
- `data/tvBrandCount.csv` – same dataset as Exercise 4.4

## AI declaration
Generative AI (Claude, Anthropic) was used to help draft the data-binding code following the exercise brief. The code was tested locally and reviewed before committing.

## Reference
Dufour, D., & Meeks, T. (2024). *D3.js in Action* (3rd ed.). Manning.

## Live Link
https://mercury.swin.edu.au/cos30045/s105972489/Exercise%204/Exercise%204.5/
