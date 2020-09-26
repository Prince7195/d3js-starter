const DUMMY_DATA = [
    { id: 'd1', value: 10, region: "USA" },
    { id: 'd2', value: 30, region: "India" },
    { id: 'd3', value: 20, region: "Germany" },
    { id: 'd4', value: 50, region: "UN" },
    { id: 'd5', value: 40, region: "UAE" }
];
const width = 250;
const height = 200;

const xScale = d3.scaleBand() // ordinal scale used for equal width
                 .domain(DUMMY_DATA.map(dPoint => dPoint.region)) // unique data point to calculate the number of items
                 .rangeRound([0, width]) // width from start to end
                 .padding(0.1); // padding b/w each width el

const yScale = d3.scaleLinear() // calculate height
                 .domain([0, 60]) // data values range
                 .range([height, 0]); // height from bottom to top

const container = d3.select("svg")
                    .classed("container", true)
                    .style("border", "1px solid red");

const bars = container
                .selectAll("rect") // to select all the el with bar class inside div el
                .data(DUMMY_DATA)
                .enter() // checks for the el with bar class inside div el with reference to data
                .append("rect") // appends the rect el corresponding to the data
                .attr("width", xScale.bandwidth()) // dynamic width
                .attr("height", d => height - yScale(d.value)) // dynamic height
                .attr("fill", "#a00ca0")
                .attr("x", data => xScale(data.region))
                .attr("y", data => yScale(data.value));

// setTimeout(() => {
//     bars.data(DUMMY_DATA.slice(0, 3)).exit().remove();
// }, 3000);
