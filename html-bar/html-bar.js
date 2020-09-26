const DUMMY_DATA = [
    { id: 'd1', value: 10, region: "USA" },
    { id: 'd2', value: 30, region: "India" },
    { id: 'd3', value: 20, region: "Germany" },
    { id: 'd4', value: 50, region: "UN" },
    { id: 'd5', value: 40, region: "UAE" }
]

const container = d3.select("div")
                    .classed("container", true)
                    .style("border", "1px solid red");

const bars = container
                .selectAll(".bar") // to select all the el with bar class inside div el
                .data(DUMMY_DATA)
                .enter() // checks for the el with bar class inside div el with reference to data
                .append("div") // appends the div el corresponding to the data
                .classed("bar", true) // adding the class to the div el
                .style("width", "50px") // style to the div el
                .style("height", d => `${d.value}px`);

