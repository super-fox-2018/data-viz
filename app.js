import * as d3 from 'd3'

// let dataset = [5, 10, 15, 20, 25]
let dataset = d3.range(15).map(() => {
  return Math.round(Math.random() * 40)
})
let multiplier = 5

const svg = d3.select('#chartArea').append('svg')
  .attr('width', 400)
  .attr('height', 300)
  .style('background', '#cacaca')

// Max and Min
// const yScale = d3.scaleLinear()
//   .domain([0, d3.max(dataset)])
//   .range([0, 300])

const yScale = d3.scaleLinear()
  .domain([0, 40])
  .range([0, 300])
  
const colorScale = d3.scaleLinear()
  .domain([0, d3.max(dataset)])
  .range(['PaleTurquoise', 'Blue'])

console.log(d3);

svg.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr('class', 'bar')
  .attr('x', (d, index) => {
    return index * 25
  })
  .attr('y', (d) => {
    return 300 - yScale(d)
  })
  .attr('width', 20)
  .attr('height', (d) => {
    return yScale(d)
  })
  .attr('fill', colorScale)
  .on('mouseover', function (d, index) {
    d3.select(this).style('fill', '#bada55')
  })
  .on('mouseout', function (d, index) {
    d3.select(this).style('fill', colorScale(d))
  })

svg.selectAll('text')
  .data(dataset)
  .enter()
  .append('text')
  .text( (d) => {
    return d
  })
  .attr('x', (d, index) => {
    return index * 25
  })
  .attr('y', (d) => {
    return 298 - yScale(d)
  })
  .attr('fill', 'blue')
