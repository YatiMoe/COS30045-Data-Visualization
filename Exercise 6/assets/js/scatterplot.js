/* =========================================================
   Exercise 6.3 — scatterplot.js
   Energy consumption vs star rating, coloured by screen tech.
   ========================================================= */

const drawScatterplot = (data) => {

  // ---------- SVG container + inner chart ----------
  const svg = d3.select("#scatterplot")
    .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("role", "img")
      .attr("aria-label", "Scatterplot of energy consumption against star rating");

  // innerChartS is declared in shared-constants.js
  innerChartS = svg
    .append("g")
      .attr("class", "inner-chart")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // ---------- Scales ----------
  const maxStar = d3.max(data, d => d.star);
  const maxEng = d3.max(data, d => d.energyConsumption);

  xScaleS
    .domain([0, maxStar])
    .range([0, innerWidth])
    .nice();

  yScaleS
    .domain([0, maxEng])
    .range([innerHeight, 0])
    .nice();

  // Colour = hue per screen technology (categorical)
  const screenTechs = Array.from(new Set(data.map(d => d.screenTech))).sort();
  colorScale
    .domain(screenTechs)
    .range(screenTechs.map(t => screenTechColors[t] || "#93A0B8"));

  // ---------- Circles ----------
  innerChartS
    .selectAll("circle")
    .data(data)
    .join("circle")
      .attr("r", 4)
      .attr("cx", d => xScaleS(d.star))
      .attr("cy", d => yScaleS(d.energyConsumption))
      .attr("fill", d => colorScale(d.screenTech))
      .attr("opacity", 0.5);

  // ---------- Axes ----------
  const bottomAxis = d3.axisBottom(xScaleS);
  innerChartS
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
      .text("Star rating");

  const leftAxis = d3.axisLeft(yScaleS);
  innerChartS
    .append("g")
      .attr("class", "axis axis-y")
      .call(leftAxis);

  // Vertical y-axis label running along the axis
  svg
    .append("text")
      .attr("class", "axis-label")
      .attr("text-anchor", "middle")
      .attr("transform", `translate(18, ${margin.top + innerHeight / 2}) rotate(-90)`)
      .text("Energy consumption (kWh/year)");

  // ---------- Legend (attached to the svg, top-right) ----------
  const legend = innerChartS
    .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${innerWidth - 80}, 0)`);

  colorScale.domain().forEach((tech, i) => {
    const item = legend
      .append("g")
        .attr("transform", `translate(0, ${i * 20})`);

    item
      .append("rect")
        .attr("width", 12)
        .attr("height", 12)
        .attr("rx", 2)
        .attr("fill", colorScale(tech));

    item
      .append("text")
        .attr("class", "legend-label")
        .attr("x", 20)
        .attr("y", 10)
        .text(tech);
  });
};
