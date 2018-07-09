import * as d3 from 'd3'

let dataset = [5, 10, 15, 20, 25]
const multiplier = 10
// d3.select('body').selectAll('div')
//   .data(dataset)
//   .enter()
//   .append('div')
//   .attr('class','bar')
//   .style('height', function(d){
//     return d * 5 + 'px'
//   })

const svg = d3.select('#chartarea').append('svg')
              .attr('width',400)
              .attr('height',300)

svg.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr('class','bar')
  .attr('x', function(d,i){
    return i * 22
  })
  .attr('y', function(d){
    return 300 - d * multiplier
  })
  .attr('width',20)
  .attr('height', function(d){
    return d * multiplier
  })