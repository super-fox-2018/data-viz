import * as d3 from 'd3'

// let dataset = [5, 10, 15, 20, 25]
let dataset = []
d3.csv("WorldCups.csv")
.then( function(data) {
  data.forEach(function(att){
    dataset.push(+att.GoalsScored)
  })

  // dataset = dataset.slice(0,5)

  const svg = d3.select('#chartarea').append('svg')
  .attr('width',600)
  .attr('height',300)
  
  const yScale = d3.scaleLinear()
  .domain([0,d3.max(dataset)])
  .range([0,300])

  const colorScale = d3.scaleLinear()
    .domain([0,d3.max(dataset)])
    .range(['peru','teal'])
  
  svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x',function(d, i){
      return i * 22
    })
    .attr('y', function(d){
      return 300 - yScale(d)
    })
    .attr('width',20)
    .attr('height',function(d){
      return yScale(d)
    })
    .attr('fill', colorScale)
    .on('mouseover', function (d, i){
      d3.select(this).style('fill', '#bada55')
    })
    .on('mouseout', function(d, i){
      d3.select(this).style('fill', colorScale(d))
    })

    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", 320)
    .attr("y", 295)
    .text("Goal scored every worldcup")
});

// let dataset = d3.range(15).map(function(){
//   return Math.random()*50
// })
// const multiplier = 10


// d3.select('body').selectAll('div')
//   .data(dataset)
//   .enter()
//   .append('div')
//   .attr('class','bar')
//   .style('height', function(d){
//     return d * 5 + 'px'
//   })





// svg.selectAll('rect')
//   .data(dataset)
//   .enter()
//   .append('rect')
//   .attr('class','bar')
//   .attr('x', function(d, i){
//     return i * 22
//   })
//   .attr('y', function(d){
//     return 300 - d * multiplier
//   })
//   .attr('width',20)
//   .attr('height', function(d){
//     return d * multiplier
//   })



// svg.selectAll('rect')
//   .data(dataset)
//   .enter()
//   .append('rect')
//   .attr('class', 'bar')
//   .attr('x', function(d, i){
//     return i
//   })
//   .attr('y', function(d){
//     return 300 - yScale(d)
//   })
//   .attr('width',20)
//   .attr('height',function(d){
//     return yScale(d)
//   })

  