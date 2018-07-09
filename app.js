var margin = {top:50, right:50, bottom:50, left:50}
var width = 600 - margin.left - margin.right
var height = 600 - margin.top - margin.bottom

var svg = d3.select("#chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate("+ margin.left + "," + margin.top+")")

var div = d3.select("body").append("div")	
        .attr("class", "tooltip")				
        .style("opacity", 0);

var x = d3.scaleBand()
          .range([0, width])
          .padding(0.2)

var y = d3.scaleLinear()
          .range([height, 0])

d3.csv("WorldCups.csv")
  .then(function(data){
    console.log(data)
    data.forEach(function(d){
      d.GoalsScored = + d.GoalsScored
    })

    const colorScale = d3.scaleLinear()
    .domain([5, d3.max(data, function(d){
      return d.GoalsScored
    })])
    .range(['blue','green'])

    x.domain(data.map(function(d){
      return d.Year
    }))

    y.domain([0, d3.max(data, function(d){
      return d.GoalsScored
    })])

    svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr('class', 'char')
    .attr("x", function(d) {
      return x(d.Year)
    })
    .attr("width", x.bandwidth())
    .attr("y", function(d){
      return y(d.GoalsScored)
    })
    .attr("height", function(d){
      return height - y(d.GoalsScored)
    })
    .attr('fill', function(d){
      return colorScale(d.GoalsScored)
    })
    .on('mouseover', function (d, i){
      d3.select(this).style('fill', '#bada55')
      div.transition()		
        .duration(200)		
        .style("opacity", .9);		
      div	
      .html( "year : " + d.Year + "<br/>" + "goals : " + d.GoalsScored)	
      .style("left", (d3.event.pageX) + "px")		
      .style("top", (d3.event.pageY - 28) + "px");	
    })
    .on('mouseout', function(d, i){
      d3.select(this).style('fill', function(d){
        div.transition()		
        .duration(500)		
        .style("opacity", 0);	
        return colorScale(d.GoalsScored)
      })
    })

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))

    svg.append("g")
      .call(d3.axisLeft(y))

    
  })

