// import d3 from "d3";

let dataset = [5, 10, 15, 20, 25]

// console.log(d3.select('body'));

const svg = 
d3.select('#chartArea').append('svg')
.attr('width', 400)
.attr('height', 300)
.style('background', '#cacaca')

// .style('height', (d) => d*10 + 'px')
svg.selectAll('rect')
.data(dataset)
.enter()
.append('rect')
.attr('class', 'bar')
.attr('x', (d, index) => index*22)
.attr('y', (d) => 300 - d*5)
.attr('height', (d) => d*5)



// d3.select('body').selectAll('div')

