/* Exercise 5.1 - Vertical bar chart with axis
   (restyled to the ApplianceWatt theme via assets/css/style.css) */

const drawBarChart = data => {

    // Set up inner chart margins and dimensions
    // extra top margin leaves room for the chart's axis label and the
    // value label sitting above the tallest bar
    const margin = { top: 60, right: 40, bottom: 40, left: 60 };
    const width = 700;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // svg container
    const svg = d3.select("#bar-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    // create inner chart group and shift it by the margins
    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // create scales - screen tech (category) on x, energy consumption (value) on y
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.Screen_Tech))
        .range([0, innerWidth])
        .padding(0.3);

    // scale a bit past the tallest bar so its value label has room above it
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Energy_Consumption) * 1.15])
        .range([innerHeight, 0]);

    // create axes
    const bottomAxis = d3.axisBottom(xScale).tickSize(0);
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

    // axis / chart label
    innerChart
        .append("text")
        .attr("class", "axis-label")
        .text("Energy Consumption (kWh)")
        .attr("x", -margin.left)
        .attr("y", -35)
        .attr("text-anchor", "start");

    // draw bars
    innerChart
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("width", xScale.bandwidth())
        .attr("height", d => innerHeight - yScale(d.Energy_Consumption))
        .attr("x", d => xScale(d.Screen_Tech))
        .attr("y", d => yScale(d.Energy_Consumption));

    // value label above each bar
    innerChart
        .selectAll(".bar-label")
        .data(data)
        .join("text")
        .attr("class", "bar-label")
        .text(d => `${Math.round(d.Energy_Consumption)} kWh`)
        .attr("x", d => xScale(d.Screen_Tech) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d.Energy_Consumption) - 10);

};

d3.csv("assets/data/screenTechEnergy55in.csv", d => {
    return {
        Screen_Tech: d.Screen_Tech.toUpperCase(),
        Energy_Consumption: +d.Energy_Consumption
    };
}).then(data => {
    console.log(data);

    // sort screen types from highest to lowest energy consumption
    data.sort((a, b) => b.Energy_Consumption - a.Energy_Consumption);

    drawBarChart(data);
});
