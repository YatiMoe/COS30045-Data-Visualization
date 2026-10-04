# Exercise 4.1 – Draw SVGs

A house and garden built with SVG shapes (rect, circle, ellipse, polygon, path, line, text) and one `<g>`/`transform` group, for COS30045 Data Visualisation.

The folder is the ApplianceWatt website with an **Exercise 4.1** page in the navigation. It shows only this exercise's answer.

## Files
- `index.html`, `televisions.html`, `about.html` – the ApplianceWatt website pages (Exercise 0.2 site)
- `exercise4-1.html` – the Exercise 4.1 answer: the SVG picture, a before/after comparison table, the coordinate annotation, and the AI declaration
- `assets/css/style.css` – site styling, including the shared `.window` rule for both window groups
- `assets/js/main.js` – site navigation script
- `assets/img/house-initial.png`, `house-customised.png`, `house-annotated.png` – screenshots used on the page
- `assets/img/PowerIcon.png` – site logo

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
