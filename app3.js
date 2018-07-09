import * as d3 from 'd3'

const margin = {top: 50, right:50, bottom: 50, left: 50}
const width = 600 - margin.left - margin.right
const height = 600 - margin.left - margin.right

const svg = d3.select('#chartArea').append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.left + margin.right)
  .append('g')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

const x = d3.scaleBand()
  .range([0, width])
  .padding(0.1)

const y = d3.scaleLinear()
  .range([height, 0])

const div = d3.select("body").append("div")	
  .attr("class", "tooltip")				
  .style("opacity", 0)

d3.csv('IMDB-Movie-Data.csv')
.then(response => {
  let data = response.slice(0, 15)

  x.domain(data.map(function (d) {return d.Title}))

  y.domain([0, d3.max(data, function(d) { 
    return d.Rating 
  })])

  const colorScale = d3
    .scaleLinear()
    .domain([5, d3.max(data, function(d) { 
      return d.Rating 
    })])
    .range(['SkyBlue', 'DarkMagenta'])

  svg.selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', function(d) {return x(d.Title)})
    .attr('width', x.bandwidth())
    .attr('y', function(d) {return y(d.Rating)})
    .attr('height', function(d) {return height - y(d.Rating)})
    .attr('fill', d => {
      return colorScale(d.Rating)
    })
    .on('mouseover', function (d, index) {
      d3.select(this).attr('fill', '#bada55')
      div.transition()		
        .duration(200)		
        .style("opacity", .9)		
      div.html(d.Title + "<br/>"  + d.Rating)	
        .style("left", (d3.event.pageX) + "px")		
        .style("top", (d3.event.pageY - 28) + "px")
    })
    .on('mouseout', function (d, index) {
      d3.select(this).attr('fill', d => {
        return colorScale(d.Rating)    
      })
    })

  svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text( d => {
      return d.Rating 
    })
    .attr('x', function(d) {return x(d.Title)})
    .attr('width', x.bandwidth())
    .attr('y', function(d) {return y(d.Rating)})
    .attr('height', function(d) {return height - y(d.Rating)})
    .attr('fill', 'blue')

  svg.append('g')
    .attr('transform', 'translate(0,' + (height) + ')')
    .call(d3.axisBottom(x))

  svg.append('g') 
    .call(d3.axisLeft(y))

})
.catch(err => {
  console.log(err)
})