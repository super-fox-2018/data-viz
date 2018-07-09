// import d3 from "d3";

let dataset = [5, 10, 34, 20, 25]

// console.log(d3.select('body'));

const svg = 
d3.select('#chartArea').append('svg')
.attr('width', 400)
.attr('height', 300)
.style('background', '#cacaca')

const yScale = d3.scaleLinear()
.domain([0, d3.max(dataset)])
.range([0,300])

const colorScale = d3.scaleLinear()
.domain([0, d3.max(dataset)])
.range(['peru', 'teal'])
// .style('height', (d) => d*10 + 'px')
svg.selectAll('rect')
.data(dataset)
.enter()
.append('rect')
.attr('class', 'bar')
.attr('x', (d, index) => index*22)
.attr('y', (d) => 300 - yScale(d))
.attr('height', (d) => yScale(d))
.attr('fill', colorScale)
.on('mouseover', function(d,i){
  d3.select(this).style('fill', '#bada55')
})
.on('mouseout', function (d,i) {
  d3.select(this).style('fill', colorScale(d))
})



// d3.select('body').selectAll('div')

