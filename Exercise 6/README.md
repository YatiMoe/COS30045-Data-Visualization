# Exercise 6 – ApplianceWatt: Interactive TV Energy Visualisations

This folder is the **ApplianceWatt** website (originally built for Exercise 0.2) extended with a new **TV Charts** page covering Exercise 6's interactive D3.js features: a histogram (6.1) with filter buttons (6.2), and a scatterplot (6.3) with tooltips (6.4).

## Site structure
- `index.html` – Home: hero section, illustrative power-meter dial, and an FAQ accordion
- `televisions.html` – Televisions: example TV models and the interactive appliance energy calculator from Exercise 0.2
- `charts.html` – **TV Charts: the Exercise 6 interactive D3.js charts** (see below)
- `about.html` – About Us: project description, site structure, and the AI declaration
- `assets/css/style.css` – base stylesheet (dark navy / teal / amber theme) shared by every page; the 6.2 filter button styles (`.filters`, `.filter`, `.filter.active`) are at the end
- `assets/css/visualisation.css` – chart-only styles shared by both charts (`.responsive-svg-container`, `.axis`, `.axis-label`, `.legend-label`, `.tooltip`, `.chart-meta`)
- `assets/js/main.js` – shared script: the Home page FAQ accordion and the Televisions page calculator (each block checks that its element exists, so the file can be included on every page)
- `assets/js/load-data.js` – loads the CSV once and calls every chart and interaction function
- `assets/js/shared-constants.js` – margins and dimensions, colours, scales, `binGenerator`, the filter array, `innerChartS`, the colour scale and tooltip size
- `assets/js/interactions.js` – Exercise 6.2 filters (`populateFilters`) and Exercise 6.4 tooltip (`createTooltip`, `handleMouseEvents`)
- `assets/js/histogram.js` – Exercise 6.1 chart code (`drawHistogram`)
- `assets/js/scatterplot.js` – Exercise 6.3 chart code (`drawScatterplot`)
- `data/Ex6_TVdata_withStar.csv` – the TV dataset (see below)
- `assets/img/PowerIcon.png` – site logo

Script load order in `charts.html` follows the brief: D3 v7 → `load-data.js` → `shared-constants.js` → `interactions.js` → `histogram.js` → `scatterplot.js`.

## TV Charts page (Exercise 6)

### 6.1 – Histogram: TV energy consumption
`assets/js/histogram.js` follows the Dufour & Meeks inner-chart pattern: an SVG with a `viewBox` and an `innerChart` group translated by the margins. `binGenerator` (a `d3.bin()` declared in `shared-constants.js`) groups the data into 14 bins. The `xScale` domain runs from the first bin's `x0` to the last bin's `x1`, and the `yScale` domain runs from 0 to the length of the largest bin. Each bar is a `rect` drawn in amber, and a stroke in the panel background colour creates the gaps between bars. The chart has `axisBottom` and `axisLeft` axes with labels. One TV uses 2,652 kWh/year and stretches the x-axis to about 2,800. It is kept in the data, as the brief leaves excluding it optional.

### 6.2 – Filters: screen technology
`populateFilters()` in `interactions.js` creates All / LED / LCD / OLED buttons from the `filters_screen` array (`id`, `label`, `isActive`) in `shared-constants.js`. A D3 `.on("click")` listener updates the `isActive` state of each filter, and `.classed("active", …)` updates the button style. `updateHistogram()` then filters the data by `screenTech` (or uses all of it), re-bins it with `binGenerator` and moves the bars to their new heights with a 500 ms `d3.easeCubicInOut` transition. The bin edges are fixed after the first draw, so filtered data always falls into the same 14 bars. A count under the chart shows how many models are displayed, for example 286 for OLED.

### 6.3 – Scatterplot: energy consumption vs star rating
`assets/js/scatterplot.js` draws one circle per TV, with star rating on the x-axis and energy consumption on the y-axis, using `innerChartS`, `xScaleS` and `yScaleS` from `shared-constants.js`. This keeps the scatterplot separate from the histogram. Circles have a radius of 4, opacity 0.5 and no stroke, so overlapping points stay visible. The `d3.scaleOrdinal()` colour scale uses a distinct hue for each screen technology (teal for LED, amber for LCD, violet for OLED), because hue suits categories while lighter or darker shades suggest magnitude. The y-axis label runs vertically along the axis, and the legend sits in the top-right corner of the SVG.

### 6.4 – Tooltips: screen size on hover
`createTooltip()` appends a tooltip group to `innerChartS`, hidden at the start with `.style("opacity", 0)`. The group contains a rounded, slightly transparent background rectangle and two lines of text. `handleMouseEvents()` attaches `mouseenter` and `mouseleave` listeners to every circle. On `mouseenter`, the tooltip text is set from the bound data `d`: the screen size, plus screen technology and brand as an extension. The tooltip is positioned from the circle's `cx`/`cy` (read with `getAttribute` on `e.target`), kept inside the chart area, raised above the circles and faded in. On `mouseleave`, it is hidden and moved out of the way, and the circle returns to its normal size.

Data: `Ex6_TVdata_withStar.csv` (Jan 2026 TV dataset supplied on Canvas, created with the provided KNIME workflow). It has 4,233 rows with columns `brand`, `model`, `screenSize`, `screenTech` (LED 3,492 / LCD 455 / OLED 286), `star` (1–8) and `energyConsumption` (kWh/year).

## How to run
Open the folder with a local server (e.g. VS Code Live Server). Opening `charts.html` directly from the file system blocks `d3.csv()` from loading the data.

## AI declaration
Generative AI (Claude, Anthropic) was used to draft the Exercise 6.1–6.4 code from the exercise briefs and to integrate it into the ApplianceWatt site. This covered:
- splitting the code into load-data, shared-constants, interactions, histogram and scatterplot files
- writing the histogram, filters, scatterplot, legend and tooltip
- adding the visualisation stylesheet and filter button styles
- adding the TV Charts nav link across all four pages
- writing this README

The generated code was reviewed and tested in a browser before being committed. The tests confirmed that all 14 bars and 4,233 circles render, that the OLED filter shows 286 models and that the tooltip appears on hover. See `about.html`'s "Generative AI use" section for the site-wide summary.

## Reference
Dufour, D., & Meeks, T. (2024). *D3.js in Action* (3rd ed.). Manning.

## Live Link
https://mercury.swin.edu.au/cos30045/s105972489/Exercise%206/
