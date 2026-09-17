/* Exercise 4.6 - Scaling charts */

const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 500 600")
    .style("border", "1px solid black");

// Step 1-2: use scales so the chart fits the svg no matter how big the
// data or the viewBox is, instead of using raw count/index values.
const drawBarChart = data => {

    // fits our count values (x-axis) into the svg width
    const xScale = d3.scaleLinear()
        .domain([0, 1200])
        .range([0, 400]);

    // fits one band per brand (y-axis) into the svg height, with some
    // padding so the bars don't touch
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, 600])
        .padding(0.2);

    svg
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("class", d => `bar bar-${d.count}`)
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "blue")
        .attr("x", 0)
        .attr("y", d => yScale(d.brand));

};

d3.csv("data/tvBrandCount.csv", d => {
    return {
        brand: d.brand,
        count: +d.count
    };
}).then(data => {
    console.log(data);
    console.log(data.length);
    console.log(d3.max(data, d => d.count));
    console.log(d3.min(data, d => d.count));
    console.log(d3.extent(data, d => d.count));

    data.sort((a, b) => b.count - a.count);
    console.log(data);

    drawBarChart(data);
});
