const margin = {
    top: 30, right: 30, bottom: 70, left: 60
};
const svg_width = 700;
const svg_height = 500;
const width = svg_width - margin.left - margin.right;
const height = svg_height - margin.top - margin.bottom;

const data = [{"Country":"United States","Value":12394},{"Country":"Russia","Value":6148},{"Country":"Germany (FRG)","Value":1653},{"Country":"France","Value":2162},{"Country":"United Kingdom","Value":1214},{"Country":"China","Value":1131},{"Country":"Spain","Value":814},{"Country":"Netherlands","Value":1167},{"Country":"Italy","Value":660},{"Country":"Israel","Value":1263}];
const data1 = [{"Country":"United States","Value":1239},{"Country":"Russia","Value":614},{"Country":"Germany (FRG)","Value":165},{"Country":"France","Value":212},{"Country":"United Kingdom","Value":121},{"Country":"China","Value":111},{"Country":"Spain","Value":81},{"Country":"Netherlands","Value":116},{"Country":"Italy","Value":66},{"Country":"Israel","Value":126}];

const svg = d3.select("svg")
    .attr("width", svg_width)
    .attr("height", svg_height)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

const tooltip = d3.select("body").append("div")
    .style("display", "none")
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("position", "absolute")
    .style("padding", "10px");

const xScale = d3.scaleBand() // category
    .range([0, width])
    .domain(data.map(d => d.Country))
    .padding(0.1);

const xAxis = d3.axisBottom(xScale);

svg.append("g").call(xAxis).attr("transform", `translate(0, ${height})`);

const yScale = d3.scaleLinear() // quantitative
    .range([height, 0])
    .domain([0, d3.max(data, d => d.Value)]);

const yAxis = d3.axisLeft(yScale);

svg.append("g").call(yAxis);

render();

function mouseover(event, d) {
    tooltip
        .html("Country: " + d.Country + "<br>" + "Value: " + d.Value)
        .style("display", "block");
  }
function mousemove(event, d) {
    tooltip
        .style("left", event.x + "px")
        .style("top", event.y + "px");
  }
function mouseleave(event, d) {
    tooltip
      .style("display", "none")
  }

function render() {

    svg.append("g").selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("width", xScale.bandwidth())
        .attr("x", d => xScale(d.Country))
        .attr("fill", "#69b3a2")
        // settin g height to 0
        .attr("height", d => height - yScale(0))
        .attr("y", yScale(0))
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseout", mouseleave);

    // Animation
    svg.selectAll("rect")
        .transition()
        .duration(800)
        .attr("height", d => height - yScale(d.Value))
        .attr("y", d => yScale(d.Value));

    setTimeout(() => {
        // update();
    }, 5000);
    
}

function update() {
    svg.selectAll("rect")
        .data(data1)
        .transition()
        .duration(800)
        .attr("height", d => height - yScale(d.Value))
        .attr("y", d => yScale(d.Value))
        

    setTimeout(() => {
        updateColor();
    }, 3000);
}

function updateColor() {
    svg.selectAll("rect")
        .transition()
        .duration(800)
        .attr("fill", "red");
}