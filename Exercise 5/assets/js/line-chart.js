/* Exercise 5.2 - Scatter plot and line chart
   (restyled to the ApplianceWatt theme via assets/css/style.css) */

const drawLineChart = data => {

    // reuse the bar chart's margins/size so both charts line up the same width
    const margin = { top: 60, right: 40, bottom: 50, left: 60 };
    const width = 700;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // svg container
    const svg = d3.select("#line-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    // create inner chart group and shift it by the margins
    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // create scales - year and price are both continuous, so both use scaleLinear
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.averagePrice)])
        .range([innerHeight, 0]);

    // set up axes - force the x-axis to show whole years, not decimals
    const bottomAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format("d"));
    const leftAxis = d3.axisLeft(yScale);

    // add the axes to the innerChart group
    innerChart
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    innerChart
        .append("g")
        .attr("class", "y-axis")
        .call(leftAxis);

    // axis labels
    innerChart
        .append("text")
        .attr("class", "axis-label")
        .text("Average Price ($ per MWh)")
        .attr("x", -margin.left)
        .attr("y", -35)
        .attr("text-anchor", "start");

    innerChart
        .append("text")
        .attr("class", "axis-label")
        .text("Year")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + 40)
        .attr("text-anchor", "middle");

    // line generator - maps each {year, averagePrice} point to an x,y position
    const lineGenerator = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.averagePrice));

    // draw the line
    innerChart
        .append("path")
        .datum(data)
        .attr("class", "price-line")
        .attr("d", lineGenerator);

    // scatter plot - one circle per year, drawn on top of the line
    innerChart
        .selectAll(".price-point")
        .data(data)
        .join("circle")
        .attr("class", "price-point")
        .attr("r", 4)
        .attr("cx", d => xScale(d.year))
        .attr("cy", d => yScale(d.averagePrice));

};

// Column names must match the CSV header exactly, including capitalisation
d3.csv("assets/data/ARE_Spot_Prices.csv", d => {
    return {
        year: +d.Year,
        averagePrice: +d["Average Price (notTas-Snowy)"]
    };
}).then(data => {
    console.log(data);

    drawLineChart(data);
});
