/* Exercise 4.3 - D3 set up */

// Step 2: create the svg inside the responsive container, using
// viewBox so its contents scale and position correctly. The border
// is just so we can see the canvas boundary - not needed in the
// final chart.
const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 1200 1600")
    .style("border", "1px solid black");

// Step 3: a test rectangle with hard-coded attributes, just to check
// the svg is set up correctly. Next exercise (4.4) will use data from
// a csv file instead of hard-coded numbers.
svg
    .append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 414)
    .attr("height", 16)
    .attr("fill", "blue");
