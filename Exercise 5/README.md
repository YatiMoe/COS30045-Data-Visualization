# Exercise 5.1/5.2/5.3 – Bar Chart, Scatter/Line Chart & Donut Chart

One page, built up across three exercises, all sharing the same D3 margin/style conventions: a vertical bar chart (5.1), a scatter plot + line chart of the average electricity spot price 1998–2024 (5.2), and a donut chart of TV screen size distribution (5.3).

## Files
- `index.html` – responsive SVG containers: `id="bar-chart"`, `id="line-chart"`, `id="donut-chart"`
- `css/style.css` – based on the Week 4 stylesheet, with `.bar`/`.bar-label` (5.1), `.price-line`/`.price-point` (5.2), and `.donut-arc`/`.donut-label` (5.3) styling added, plus shared axis styling
- `js/main.js` – (5.1) loads the TV energy CSV, sorts by energy consumption, and draws the bar chart using the D3 margin convention (`innerChart` group, `scaleBand` x-axis, `scaleLinear` y-axis, `axisBottom`/`axisLeft`, an axis label, and value labels above each bar)
- `js/line-chart.js` – (5.2) loads the spot price CSV, and draws a scatter plot (one circle per year) plus a `d3.line()` path over the same `scaleLinear` x/y scales, reusing the Exercise 5.1 margins so the two charts are the same size
- `js/donut-chart.js` – (5.3) loads the screen-size-category CSV and draws a donut chart with `d3.pie()` (sort disabled to keep the csv's category order) and `d3.arc()`, coloured with `d3.scaleOrdinal(d3.schemeSet2)`, with labels centred on each slice via `arcGenerator.centroid()`
- `data/screenTechEnergy55in.csv` – average labelled energy consumption (kWh/year) per screen technology, for 55" TVs only, exported from the provided KNIME workflow (row filter → group by → CSV writer)
- `data/ARE_Spot_Prices.csv` – Year and Average Price (notTas-Snowy) columns from the provided ARE spot price dataset, 1998–2024
- `data/screensizeCategoryCount.csv` – count of TV models by screen size category (small/medium/large), exported from the provided KNIME workflow (expression → group by → CSV writer)

## AI declaration
Generative AI (Claude, Anthropic) was used to help draft the margin-convention/axis/scatter/line/donut code following the exercise briefs. The code was tested locally and reviewed before committing.

## Reference
Dufour, D., & Meeks, T. (2024). *D3.js in Action* (3rd ed.). Manning.

## Live Link
https://mercury.swin.edu.au/cos30045/s105972489/Exercise%205/
