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
