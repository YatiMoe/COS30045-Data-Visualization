# Exercise 4.7 – Adding labels

Adds a brand-name label and a count value to each bar, finishing the bar chart.

## Files
- `index.html` – same responsive SVG container as the earlier exercises
- `css/style.css` – unchanged from Exercise 4.3
- `js/main.js` – bars start at `x=100` to leave room for labels; each bar and its two labels are wrapped in a `<g>` translated to `yScale(d.brand)` so they move together; a right-aligned brand-name label sits before the bar and a count value sits after it
- `data/tvBrandCount.csv` – same dataset as Exercise 4.4

## AI declaration
Generative AI (Claude, Anthropic) was used to help draft the labelling code following the exercise brief. The code was tested locally and reviewed before committing.

## Reference
Dufour, D., & Meeks, T. (2024). *D3.js in Action* (3rd ed.). Manning.

## Live Link
https://mercury.swin.edu.au/cos30045/s105972489/Exercise%204/Exercise%204.7/
