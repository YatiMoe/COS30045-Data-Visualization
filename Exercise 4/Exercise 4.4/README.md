# Exercise 4.4 – Load data from CSV

Loads `tvBrandCount.csv` with D3, converts it to typed rows, and logs it to the console ready for the bar chart in Exercise 4.5.

## Files
- `index.html` – same responsive SVG container as Exercise 4.3
- `css/style.css` – unchanged from Exercise 4.3
- `js/main.js` – loads the CSV with `d3.csv`, converts `count` to a number, and logs the data, its length, max, min, and extent
- `data/tvBrandCount.csv` – TV brand vs. model count, exported from the provided KNIME workflow (`2026 TV Data.knwf`), grouped by brand and filtered to brands with 20+ models

## AI declaration
Generative AI (Claude, Anthropic) was used to help draft the CSV-loading code following the exercise brief, and to extract the dataset from the KNIME workflow file. The code was tested locally and reviewed before committing.

## Reference
Dufour, D., & Meeks, T. (2024). *D3.js in Action* (3rd ed.). Manning.

## Live Link
https://mercury.swin.edu.au/cos30045/s105972489/Exercise%204/Exercise%204.4/
