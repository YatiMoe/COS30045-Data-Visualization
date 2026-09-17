/* Exercise 4.4 - Load data from csv */

// Keep the svg from 4.3, ready for the bar chart in a later exercise.
const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 1200 1600")
    .style("border", "1px solid black");

// Step 3: bar chart will be drawn here in Exercise 4.5. For now this is
// just an empty stub so the call below doesn't error.
function drawBarChart(data) {

}

// Step 1 (for reference): loading the csv with no row conversion returns
// every value as a string, e.g. { brand: "akai", count: "31" }
// d3.csv("data/tvBrandCount.csv", d => {
//     console.log(d);
// });

// Step 2: convert count to a number as each row is read, then log the
// whole typed array once it has all loaded.
d3.csv("data/tvBrandCount.csv", d => {
    return {
        brand: d.brand,
        count: +d.count
    };
}).then(data => {
    console.log(data);

    // Step 3: inspect the data
    console.log(data.length);
    console.log(d3.max(data, d => d.count));
    console.log(d3.min(data, d => d.count));
    console.log(d3.extent(data, d => d.count));

    // sort brands from highest to lowest count
    data.sort((a, b) => b.count - a.count);
    console.log(data);

    drawBarChart(data);
});
