/* =========================================================
   Exercise 6 — load-data.js
   Loads the TV dataset once and hands it to every chart.
   ========================================================= */

d3.csv("data/Ex6_TVdata_withStar.csv", d => ({
  brand: d.brand ? d.brand.charAt(0).toUpperCase() + d.brand.slice(1) : "",
  model: d.model,
  screenSize: +d.screenSize,
  screenTech: d.screenTech,
  energyConsumption: +d.energyConsumption,
  star: +d.star
})).then(data => {
  // Drop rows that could not be parsed into numbers
  data = data.filter(d => !isNaN(d.energyConsumption) && !isNaN(d.star));

  console.log("TV data loaded:", data.length, "rows", data);

  // 6.1 Histogram
  drawHistogram(data);

  // 6.2 Filters for the histogram
  populateFilters(data);

  // 6.3 Scatterplot
  drawScatterplot(data);

  // 6.4 Tooltip — called last so the circles already exist
  createTooltip();
  handleMouseEvents();
}).catch(error => {
  console.error("Error loading the TV data:", error);
  d3.select("#histogram").append("p")
    .attr("class", "chart-error")
    .text("Could not load data/Ex6_TVdata_withStar.csv. Open this page through a local server (e.g. VS Code Live Server).");
});
