/* Exercise 5.3 - Donut chart */

const drawDonutChart = data => {

    // Set up chart dimensions - sized relative to the radius, not margins,
    // since a donut has no axes to leave room for
    const width = 1000;
    const height = 500;
    const radius = Math.min(width, height) / 2 - 20; // leave some padding

    // colour scale - one colour per screen size category
    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.Screensize_Category))
        .range(d3.schemeSet2);

    // calculate the angle for each slice using d3.pie
    // sort is disabled so the slices keep the category order from the csv
    const pie = d3.pie()
        .value(d => d.Count)
        .sort(null);

    // arc generator - a donut has an inner radius as well as an outer one
    const arcGenerator = d3.arc()
        .innerRadius(radius * 0.6)
        .outerRadius(radius);

    // svg container
    const svg = d3.select("#donut-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`);

    // centre the innerChart in the middle of the svg
    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // bind data and draw the arcs
    innerChart
        .selectAll(".donut-arc")
        .data(pie(data))
        .join("path")
        .attr("class", "donut-arc")
        .attr("d", arcGenerator)
        .attr("fill", d => color(d.data.Screensize_Category));

    // label each slice, centred using the arc's own centroid
    innerChart
        .selectAll(".donut-label")
        .data(pie(data))
        .join("text")
        .attr("class", "donut-label")
        .text(d => d.data.Screensize_Category)
        .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
        .attr("text-anchor", "middle");

};

// no sort here - the pie() call above keeps the categories in csv order
d3.csv("data/screensizeCategoryCount.csv", d => {
    return {
        Screensize_Category: d.Screensize_Category,
        Count: +d.Count
    };
}).then(data => {
    console.log(data);

    drawDonutChart(data);
});
