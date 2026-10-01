/* =========================================================
   Exercise 6.1 — histogram.js
   Histogram of TV energy consumption (kWh/year).
   ========================================================= */

const drawHistogram = (data) => {

  // ---------- SVG container + inner chart ----------
  const svg = d3.select("#histogram")
    .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("role", "img")
      .attr("aria-label", "Histogram of TV energy consumption");

  const innerChart = svg
    .append("g")
      .attr("class", "inner-chart")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // ---------- Bins ----------
  const bins = binGenerator(data);
  console.log("Histogram bins:", bins);

  // Lock the bin edges so filtered data (6.2) re-bins into the same bars
  binGenerator
    .domain([bins[0].x0, bins[bins.length - 1].x1])
    .thresholds(bins.slice(1).map(b => b.x0));

  // ---------- Scales ----------
  const minEng = bins[0].x0;
  const maxEng = bins[bins.length - 1].x1;
  const binsMaxLength = d3.max(bins, d => d.length);

  xScale
    .domain([minEng, maxEng])
    .range([0, innerWidth]);

  yScale
    .domain([0, binsMaxLength])
    .range([innerHeight, 0])
    .nice();

  // ---------- Bars ----------
  innerChart
    .selectAll("rect")
    .data(bins)
    .join("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d.x0))
      .attr("y", d => yScale(d.length))
      .attr("width", d => xScale(d.x1) - xScale(d.x0))
      .attr("height", d => innerHeight - yScale(d.length))
      .attr("fill", barColor)
      .attr("stroke", bodyBackgroundColor)
      .attr("stroke-width", 2);

  // ---------- Axes ----------
  const bottomAxis = d3.axisBottom(xScale);
  innerChart
    .append("g")
      .attr("class", "axis axis-x")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(bottomAxis);

  svg
    .append("text")
      .attr("class", "axis-label")
      .attr("text-anchor", "end")
      .attr("x", width - margin.right)
      .attr("y", height - 14)
      .text("Labelled energy consumption (kWh/year)");

  const leftAxis = d3.axisLeft(yScale);
  innerChart
    .append("g")
      .attr("class", "axis axis-y")
      .call(leftAxis);

  svg
    .append("text")
      .attr("class", "axis-label")
      .attr("x", margin.left)
      .attr("y", 22)
      .text("Frequency (number of TV models)");
};
