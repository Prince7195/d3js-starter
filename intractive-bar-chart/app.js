const DUMMY_DATA = [
    { id: 'd1', region: 'USA', value: 10 },
    { id: 'd2', region: 'India', value: 12 },
    { id: 'd3', region: 'China', value: 11 },
    { id: 'd4', region: 'Germany', value: 6 },
  ];

const MARGINS = { top: 20, bottom: 10 };
const CHART_WIDTH = 600;
const HEIGHT = 400;
const CHART_HEIGHT = HEIGHT + MARGINS.top + MARGINS.bottom;

let unSelectedIds = [];
let selectedData = DUMMY_DATA;

const x = d3.scaleBand()
        .rangeRound([0, CHART_WIDTH]) // width from start to end
        .padding(0.1);

const y = d3.scaleLinear()
        .range([HEIGHT, 0]);

const chartContainer = d3
    .select("svg")
    .attr("width", CHART_WIDTH)
    .attr("height", CHART_HEIGHT);

x.domain(DUMMY_DATA.map(d => d.region));

y.domain([0, d3.max(DUMMY_DATA, d => d.value) + 3])

const chart = chartContainer.append("g");

chart.append("g")
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .attr("transform", `translate(0, ${HEIGHT})`)
    .attr("color", "#4f009e");

function reRenderCharts() {
    chart.selectAll(".bar")
        .data(selectedData, data => data.id) // reference to remove, to be unique identifier
        .enter() // to get the information of the element to add
        .append("rect")
        .classed("bar", true)
        .attr("width", x.bandwidth())
        .attr("height", d => HEIGHT - y(d.value))
        .attr("x", d => x(d.region))
        .attr("y", d =>  y(d.value));

    chart.selectAll(".bar")
        .data(selectedData, data => data.id)
        .exit() // to get the information of the element to remove
        .remove(); // to remove the element

    chart.selectAll(".label")
        .data(selectedData, data => data.id)
        .enter()
        .append("text")
        .classed("label", true)
        .text(d => d.value)
        .attr("x", d => x(d.region) + x.bandwidth() / 2)
        .attr("y", d =>  y(d.value) - 20)
        .attr("text-anchor", "middle");

    chart.selectAll(".label")
        .data(selectedData, data => data.id)
        .exit()
        .remove();
}

reRenderCharts();

const listItems = d3.select("ul")
    .selectAll("li")
    .data(DUMMY_DATA)
    .enter()
    .append("li");

listItems.append("span").text(d => d.region);
listItems.append("input")
    .attr("type", "checkbox")
    .attr("checked", true)
    .on("change", (e, data) => {
        if (unSelectedIds.includes(data.id)) {
            unSelectedIds = unSelectedIds.filter(id => id !== data.id);
        } else {
            unSelectedIds.push(data.id);
        }
        selectedData = DUMMY_DATA.filter(d => !unSelectedIds.includes(d.id));
        reRenderCharts();
    });
