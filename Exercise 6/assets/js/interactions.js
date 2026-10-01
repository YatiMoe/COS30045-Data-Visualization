/* =========================================================
   Exercise 6 — interactions.js
   6.2 Filter buttons for the histogram
   6.4 Tooltip for the scatterplot
   ========================================================= */

/* ---------- 6.2 Filters ---------- */
const populateFilters = (data) => {

  d3.select("#filters_screen")
    .selectAll(".filter")
    .data(filters_screen)
    .join("button")
      .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
      .attr("type", "button")
      .attr("aria-pressed", d => d.isActive)
      .text(d => d.label)
      .on("click", (e, d) => {
        console.log("Filter clicked:", e, d);

        if (!d.isActive) {
          // Make the clicked button the only active one
          filters_screen.forEach(filter => {
            filter.isActive = d.id === filter.id;
          });

          d3.selectAll("#filters_screen .filter")
            .classed("active", filter => filter.id === d.id)
            .attr("aria-pressed", filter => filter.id === d.id);

          updateHistogram(d.id, data);
        }
      });

  const updateHistogram = (filterId, data) => {

    const updatedData = filterId === "all"
      ? data
      : data.filter(tv => tv.screenTech === filterId);

    const updatedBins = binGenerator(updatedData);

    d3.selectAll("#histogram rect.bar")
      .data(updatedBins)
      .transition()
        .duration(500)
        .ease(d3.easeCubicInOut)
        .attr("y", d => yScale(d.length))
        .attr("height", d => innerHeight - yScale(d.length));

    d3.select("#histogram-count")
      .text(`${updatedData.length.toLocaleString()} TV models shown`);
  };

  d3.select("#histogram-count")
    .text(`${data.length.toLocaleString()} TV models shown`);
};

/* ---------- 6.4 Tooltip ---------- */
const createTooltip = () => {

  const tooltip = innerChartS
    .append("g")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("pointer-events", "none");

  tooltip
    .append("rect")
      .attr("width", tooltipWidth)
      .attr("height", tooltipHeight)
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("fill", "#1D2740")
      .attr("fill-opacity", 0.95)
      .attr("stroke", barColor)
      .attr("stroke-width", 1);

  tooltip
    .append("text")
      .attr("class", "tooltip-size")
      .attr("x", tooltipWidth / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle");

  tooltip
    .append("text")
      .attr("class", "tooltip-detail")
      .attr("x", tooltipWidth / 2)
      .attr("y", 38)
      .attr("text-anchor", "middle");
};

const handleMouseEvents = () => {

  innerChartS.selectAll("circle")
    .on("mouseenter", (e, d) => {
      console.log("mouseenter", e, d);

      // Fill the tooltip with the screen size (+ tech and brand as an extension)
      d3.select(".tooltip .tooltip-size")
        .text(`${d.screenSize}" screen`);
      d3.select(".tooltip .tooltip-detail")
        .text(`${d.screenTech} · ${d.brand}`);

      // Position relative to the circle centre
      const cx = +e.target.getAttribute("cx");
      const cy = +e.target.getAttribute("cy");

      // Keep the tooltip inside the inner chart
      let tx = cx - tooltipWidth / 2;
      tx = Math.max(0, Math.min(tx, innerWidth - tooltipWidth));
      let ty = cy - tooltipHeight - 10;
      if (ty < 0) ty = cy + 10;

      d3.select(e.target)
        .attr("r", 6)
        .attr("opacity", 1);

      d3.select(".tooltip")
        .raise() // keep the tooltip above every circle
        .attr("transform", `translate(${tx}, ${ty})`)
        .transition()
          .duration(200)
          .style("opacity", 1);
    })
    .on("mouseleave", (e, d) => {
      console.log("mouseleave", e, d);

      d3.select(e.target)
        .attr("r", 4)
        .attr("opacity", 0.5);

      d3.select(".tooltip")
        .style("opacity", 0)
        .attr("transform", "translate(0, 500)"); // move out of the way
    });
};
