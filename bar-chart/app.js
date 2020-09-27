const fruits = [
  {name: "🍊", count: 21},
  {name: "🍇", count: 13},
  {name: "🍏", count: 8},
  {name: "🍌", count: 5},
  {name: "🍐", count: 3},
  {name: "🍋", count: 2},
  {name: "🍎", count: 1},
  {name: "🍉", count: 1}
];

const margin = { top: 20, right: 20, bottom: 20, left: 20 };
const barHeight = 400;
const barWidth = 600;
const width = barWidth + margin.left + margin.right;
const height = barHeight + margin.top + margin.bottom;

const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

const xScale = d3.scaleLinear()
    .domain([0, d3.max(fruits, f => f.count)])
    .range([margin.left, width - margin.right]);

const yScale = d3.scaleBand()
    .domain(fruits.map(f => f.name))
    .range([margin.top, height - margin.bottom])
    .padding(0.1)
    .round(true);

const xAxis = d3.axisTop(xScale).tickSizeOuter(0);
const yAxis = d3.axisLeft(yScale).tickSizeOuter(0);

svg.append("g").call(xAxis)
    .attr("transform", `translate(0, ${margin.top})`);
svg.append("g").call(yAxis)
    .attr("transform", `translate(${margin.left}, 0)`);

svg.selectAll("rect")
    .data(fruits)
    .enter()
    .append("rect")
    .attr("width", f => xScale(f.count))
    .attr("height", yScale.bandwidth())
    .attr("x", f => margin.left)
    .attr("y", f => yScale(f.name))
    .attr("fill", "#008ec4");

