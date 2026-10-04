/* Shared stage functions used by the Exercise 4.3-4.7 "how we built it"
   pages. Each function reproduces what that exercise's own js/main.js
   does, rendered into whatever container selector is passed in. */

/* Exercise 4.3 - D3 set up: a test rectangle, to check the svg works */
function stage43(container) {
  const svg = d3.select(container)
    .append("svg")
    .attr("viewBox", "0 0 1200 60")
    .style("border", "1px solid var(--line)");

  svg.append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 414)
    .attr("height", 16)
    .attr("fill", "blue");
}

/* Exercise 4.4 - Load data from csv: show the loaded + typed data as a
   table (the exercise itself only logs this to the console) */
function stage44(container, data) {
  const table = d3.select(container)
    .append("table")
    .attr("class", "changes");

  table.append("thead")
    .append("tr")
    .selectAll("th")
    .data(["Brand", "Count"])
    .join("th")
    .text(d => d);

  table.append("tbody")
    .selectAll("tr")
    .data(data)
    .join("tr")
    .selectAll("td")
    .data(d => [d.brand, d.count])
    .join("td")
    .text(d => d);
}

/* Exercise 4.5 - D3 binding and drawing: one <rect> per brand, raw
   pixel widths/positions */
function stage45(container, data) {
  const barHeight = 20;
  const spacing = 4;

  const svg = d3.select(container)
    .append("svg")
    .attr("viewBox", `0 0 1200 ${data.length * (barHeight + spacing) + 10}`)
    .style("border", "1px solid var(--line)");

  svg.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", d => `bar bar-${d.count}`)
    .attr("width", d => d.count)
    .attr("height", barHeight)
    .attr("fill", "blue")
    .attr("x", 0)
    .attr("y", (d, i) => i * (barHeight + spacing));
}

/* Exercise 4.6 - Scaling charts: xScale (linear) for width, yScale
   (band) for height/position, so the chart fits any svg size */
function stage46(container, data) {
  const svg = d3.select(container)
    .append("svg")
    .attr("viewBox", "0 0 500 600")
    .style("border", "1px solid var(--line)");

  const xScale = d3.scaleLinear().domain([0, 1200]).range([0, 400]);
  const yScale = d3.scaleBand().domain(data.map(d => d.brand)).range([0, 600]).padding(0.2);

  svg.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", d => `bar bar-${d.count}`)
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("fill", "blue")
    .attr("x", 0)
    .attr("y", d => yScale(d.brand));
}

/* Exercise 4.7 - Adding labels: each bar + its two labels grouped in
   a <g>, translated by the band scale */
function stage47(container, data) {
  const svg = d3.select(container)
    .append("svg")
    .attr("viewBox", "0 0 500 600")
    .style("border", "1px solid var(--line)");

  const xScale = d3.scaleLinear().domain([0, 1200]).range([0, 400]);
  const yScale = d3.scaleBand().domain(data.map(d => d.brand)).range([0, 600]).padding(0.2);

  const barAndLabel = svg
    .selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

  barAndLabel.append("rect")
    .attr("class", d => `bar bar-${d.count}`)
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("fill", "blue")
    .attr("x", 100)
    .attr("y", 0);

  barAndLabel.append("text")
    .text(d => d.brand)
    .attr("x", 90)
    .attr("y", 15)
    .attr("text-anchor", "end")
    .attr("fill", "#F2F4F8")
    .style("font-size", "13px");

  barAndLabel.append("text")
    .text(d => d.count)
    .attr("x", d => 100 + xScale(d.count) + 5)
    .attr("y", 15)
    .attr("fill", "#F2F4F8")
    .style("font-size", "13px");
}

/* Loads the dataset once, sorted highest-to-lowest, same as every
   exercise's own main.js does. */
function loadBrandData() {
  return d3.csv("assets/data/tvBrandCount.csv", d => {
    return { brand: d.brand, count: +d.count };
  }).then(data => {
    data.sort((a, b) => b.count - a.count);
    return data;
  });
}
