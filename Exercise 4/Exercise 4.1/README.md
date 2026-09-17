# Exercise 4.1 – Draw SVGs

A house and garden built with SVG shapes (rect, circle, ellipse, polygon, path, line, text) and one `<g>`/`transform` group, for COS30045 Data Visualisation.

## Files
- `index.html` – the finished page: the SVG picture, before/after comparison, coordinate annotation, and AI declaration
- `v1-initial.html` – Step 1, the plain first version of the house (before customisation)
- `v2-customised.html` – Step 3–4, after recolouring the roof/house body and grouping the windows
- `annotated.html` – the coordinate-annotated version used to generate the annotated screenshot
- `assets/css/style.css` – page styling, including the shared `.window` rule for both window groups
- `assets/img/house-initial.png`, `house-customised.png`, `house-annotated.png` – screenshots used on the page

## What changed (Step 3–4)
- Roof: recoloured, added a stroke
- House body: recoloured, added a stroke
- Windows: replaced two separate `<rect>` elements with two `<g class="window">` groups, each positioned with `transform="translate(x,y)"` and styled through one shared CSS rule, with a mullion line added to each

## AI declaration
Generative AI (Claude, Anthropic) was used to draft the initial SVG house (Step 1). The customisation (Step 3–4) was then made directly in the SVG markup.

## Reference
Dufour, D., & Meeks, T. (2024). *D3.js in Action* (3rd ed.). Manning.

## Live Link
https://mercury.swin.edu.au/cos30045/s105972489/Exercise%204/Exercise%204.1/