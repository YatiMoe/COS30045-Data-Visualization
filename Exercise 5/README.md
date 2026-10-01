# Exercise 5 – ApplianceWatt: TV Energy & Electricity Data Visualisations

This folder is the **ApplianceWatt** website (originally built for Exercise 0.2) extended with a new **Visualisations** page covering Exercise 5's three D3.js chart types: a vertical bar chart (5.1), a scatter plot + line chart (5.2), and a donut chart (5.3).

## Site structure
- `index.html` – Home: hero section, illustrative power-meter dial, and an FAQ accordion
- `televisions.html` – Televisions: example TV models and an interactive appliance energy calculator
- `visualisations.html` – **Visualisations: the three Exercise 5 D3.js charts** (see below)
- `about.html` – About Us: project description, site structure, and the AI declaration below
- `assets/css/style.css` – single shared stylesheet (dark navy / teal / amber theme) used by every page; the chart styling is in its own section at the end (`.chart-panel`, `.bar`, `.bar-label`, `.axis-label`, `.price-line`, `.price-point`, `.donut-arc`, `.donut-label`, shared axis text/line colours)
- `assets/js/main.js` – shared script: the Home page FAQ accordion and the Televisions page calculator (each block guards on the element existing, so it's safe to include on every page)
- `assets/js/bar-chart.js` – Exercise 5.1 chart code
- `assets/js/line-chart.js` – Exercise 5.2 chart code
- `assets/js/donut-chart.js` – Exercise 5.3 chart code
- `assets/data/screenTechEnergy55in.csv`, `assets/data/ARE_Spot_Prices.csv`, `assets/data/screensizeCategoryCount.csv` – the three datasets (see below)
- `assets/img/PowerIcon.png` – site logo

## Visualisations page (Exercise 5)

### 5.1 – Bar chart: energy consumption by screen technology (55" TVs)
`assets/js/bar-chart.js` loads `screenTechEnergy55in.csv`, sorts by energy consumption (highest to lowest), and draws the chart using the D3 margin convention: an `innerChart` group, a `scaleBand` x-axis (screen technology), a `scaleLinear` y-axis (kWh/year), `axisBottom`/`axisLeft`, a y-axis label, and a value label above each bar.
Data: average labelled energy consumption (kWh/year) per screen technology, for 55" TVs only, exported from the provided KNIME workflow (row filter → group by → CSV writer).

### 5.2 – Scatter plot + line chart: electricity spot price, 1998–2024
`assets/js/line-chart.js` loads `ARE_Spot_Prices.csv` and draws a scatter plot (one circle per year) plus a `d3.line()` path, both over the same `scaleLinear` x/y scales, reusing the 5.1 margins so the two charts line up.
Data: Year and "Average Price (notTas-Snowy)" columns from the provided ARE spot price dataset. Only these two columns are included here (not the five per-state columns) since that's all this chart needed — swap in the full downloaded file if a later exercise calls for a per-state line.

### 5.3 – Donut chart: TV screen size distribution
`assets/js/donut-chart.js` loads `screensizeCategoryCount.csv` and draws a donut with `d3.pie()` (sort disabled, so slices keep the CSV's large/medium/small order) and `d3.arc()` (60% inner radius), coloured with the site's own teal/amber/slate palette instead of a generic D3 colour scheme, with labels centred on each slice via `arcGenerator.centroid()`.
Data: count of TV models by screen size category, exported from the provided KNIME workflow (expression → group by → CSV writer).

## AI declaration
Generative AI (Claude, Anthropic) was used at two stages of this folder's history:
1. Drafting the original Exercise 5.1–5.3 chart code (margin convention, scales, axes, scatter/line, donut/pie/arc) directly from the exercise briefs, in a standalone page with the site's original plain white/green styling.
2. Restyling that chart code to the ApplianceWatt theme and integrating it as a new Visualisations page — moving the CSV/JS assets under `assets/`, adding the chart-panel/colour CSS, adding the page's nav link across all four pages, and writing this page's copy.

In both stages the generated code was reviewed, tested in a browser against the exercise's target screenshots, and adjusted before being committed. See `about.html`'s "Generative AI use" section for the site-wide summary.

## Reference
Dufour, D., & Meeks, T. (2024). *D3.js in Action* (3rd ed.). Manning.

## Live Link
https://mercury.swin.edu.au/cos30045/s105972489/Exercise%205/
