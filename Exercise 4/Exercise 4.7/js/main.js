/* Exercise 4.7 - Adding labels */

const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 500 600")
    .style("border", "1px solid black");

const drawBarChart = data => {

    const xScale = d3.scaleLinear()
        .domain([0, 1200])
        .range([0, 400]);

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, 600])
        .padding(0.2);

    // group each bar with its labels so they move together
    const barAndLabel = svg
        .selectAll("g")
        .data(data)
        .join("g")
        .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

    // the bar - x is now 100 to leave room for the brand label
    barAndLabel
        .append("rect")
        .attr("class", d => `bar bar-${d.count}`)
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "blue")
        .attr("x", 100)
        .attr("y", 0);

    // brand name, right-aligned just before the bar
    barAndLabel
        .append("text")
        .text(d => d.brand)
        .attr("x", 90)
        .attr("y", 15)
        .attr("text-anchor", "end")
        .style("font-size", "13px");

    // count value, just after the end of the bar
    barAndLabel
        .append("text")
        .text(d => d.count)
        .attr("x", d => 100 + xScale(d.count) + 5)
        .attr("y", 15)
        .style("font-size", "13px");

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
