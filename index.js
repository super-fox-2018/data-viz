import * as d3 from "d3";

let dataset2 = [5, 10, 15, 20, 25];

const margin = { top: 20, right: 0, bottom: 40, left: 40 };

const height = 400;
const width = 1000;

d3.csv("Pokemon.7cd05a2c.csv").then(dataset => {
  console.log(dataset);

  let y = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, d => d.Attack)]).nice()
    .range([height - margin.bottom, margin.top])

  let x = d3
    .scaleBand()
    .domain(dataset.map(d => d.Name))
    .range([margin.left, width - margin.right])
    .padding(0.2)

  let xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x)
        .tickSizeOuter(0))
  
  let yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())

  pokemon
    .append("g")
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", d => x(d.Name))
    .attr("y", d => y(d.Attack))
    .attr("height", d => y(0) - y(d.Attack))
    .attr("width", x.bandwidth());
  
  pokemon.append("g")
    .call(xAxis)
    .append("text")
      .attr("x", (width - margin.left - margin.right) / 2)
      .attr("y", 28)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Pokemon Name");

  pokemon.append("g")
    .call(yAxis)
    .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Attack Points");
});

const pokemon = d3
  .select("#pokemon")
  .attr("width", width)
  .attr("height", height)
  .style("background", "#cacaca");

const colorScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset2)])
  .range(["peru", "teal"]);

// const pokemon = d3
//   .select("#chart")
//   .attr("width", width)
//   .attr("height", height)
//   .style("background", "#cacaca");

// pokemon
//   .selectAll("rect")
//   .data(dataset2)
//   .enter()
//   .append("rect")
//   .attr("class", "bar test")
//   .attr("x", (d, i) => {
//     return i * 30
//   })
//   .attr("y", (d) => {
//     return height - yScale(d)
//   })
//   .attr("width", 20)
//   .attr("height", (d) => {
//     return yScale(d)
//   })
//   .attr("fill", colorScale)
