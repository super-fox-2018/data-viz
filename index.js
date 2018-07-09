import * as d3 from "d3";

let dataset2 = [5, 10, 15, 20, 25];

const margin = { top: 20, right: 20, bottom: 50, left: 40 };

const height = 400;
const width = 1200;

const pokemon = d3
  .select("#pokemon")
  .attr("width", width)
  .attr("height", height)
  .style("background", "#cacaca");

d3.csv("Pokemon.7cd05a2c.csv").then(dataset => {
  console.log(dataset);

  let keys = ["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"];

  let x0 = d3
    .scaleBand()
    .range([margin.left, width - margin.right])
    .paddingInner(0.1)
    .domain(dataset.map(d => d.Name));

  let x1 = d3
    .scaleBand()
    .padding(0.05)
    .domain(keys)
    .rangeRound([0, x0.bandwidth()]);

  let y = d3
    .scaleLinear()
    .range([height - margin.bottom, margin.top])
    .domain([0, 180])
    .nice();

  var color = d3
    .scaleOrdinal()
    .range(["#8366ac", "#ca5959", "#e4be6c", "#5960ae", "#75aa68", "#f8a3d3"]);

  pokemon
    .append("g")
    .selectAll("g")
    .data(dataset)
    .enter()
    .append("g")
    .attr("transform", function(d) {
      return `translate(${x0(d.Name)},-${margin.bottom})`;
    })
    .selectAll("rect")
    .data(function(d) {
      return keys.map(function(key) {
        return { key: key, value: d[key] };
      });
    })
    .enter()
    .append("rect")
    .attr("x", function(d) {
      return x1(d.key);
    })
    .attr("y", function(d) {
      return y(d.value);
    })
    .attr("width", x1.bandwidth())
    .attr("height", function(d) {
      return height - y(d.value);
    })
    .attr("fill", function(d) {
      return color(d.key);
    });

  pokemon
    .append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x0))
    .append("text")
    .attr("x", (width - margin.left - margin.right) / 2)
    .attr("y", 30)
    .attr("dy", "0.32em")
    .attr("fill", "#000")
    .attr("font-weight", "bold")
    .attr("text-anchor", "start")
    .text("Pokemon Name");

  pokemon
    .append("g")
    .attr("class", "y axis")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
    .attr("x", 2)
    .attr("y", y(y.ticks().pop()) + 0.5)
    .attr("dy", "0.32em")
    .attr("fill", "#000")
    .attr("font-weight", "bold")
    .attr("text-anchor", "start")
    .text("Stats Point");

  // pokemon.select('.y').transition().duration(500).delay(1300).style('opacity','1');

  // pokemon
  //   .append("g")
  //   .attr("class", "grid")
  //   .call(
  //     d3.axisLeft(y)
  //       .tickSize(-width)
  //       .tickFormat("")
  //   );

  let legend = pokemon
    .append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter()
    .append("g")
    .attr("transform", function(d, i) {
      return `translate(-${margin.right + i * 80}, 20)`;
    });

  legend
    .append("rect")
    .attr("x", width - 19)
    .attr("width", 19)
    .attr("height", 19)
    .attr("fill", color);

  legend
    .append("text")
    .attr("x", width - 24)
    .attr("y", 9.5)
    .attr("dy", "0.32em")
    .text(function(d) {
      return d;
    });
});
