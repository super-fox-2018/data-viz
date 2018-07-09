// margin & radius
let margin = {top: 20, right: 20, bottom: 20, left: 20}
let width = 500 - margin.right - margin.left
let height = 500 - margin.top - margin.bottom
let radius = width/2

// colors
let color = d3.scaleOrdinal()
    .range(["#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2"])

// arc generator
let arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0)
    // .innerRadius(radius - 70)

let labelArc = d3.arc()
    .outerRadius(radius - 50)
    .innerRadius (radius - 50)

// pie generator
let pie = d3.pie()
            .sort(null)
            .value(function(d) {
              // return d.count
              return d.rating_count_tot
            })

// define svg
let svg = d3.select("body")
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', "translate(" + width/2 + "," + height/2 + ")")

// function for tween effect
function pieTween(b) {
  b.innerRadius = 0
  var i = d3.interpolate({
    starAngle: 0,
    endAngle: 0
  }, b)

  return function (t) { return arc(i(t))}
}

let appleStoreData = []
d3.csv("/data/AppleStore.csv")
.then( function(data) {
  data.forEach(d => {
    d.rating_count_tot = +d.rating_count_tot
  });
  data.sort((a, b) => {
    return b.rating_count_tot - a.rating_count_tot
  })
  // console.log(data)
  for(let i=0; i<12; i++){
    console.log(data[i].track_name)
    appleStoreData.push(data[i])
  }
  // console.log(appleStoreData)

  // append g elements (arc)
    let g = svg.selectAll(".arc")
      .data(pie(appleStoreData))
      .enter()
      .append('g')
      .attr("class", "arc")

    // append  the path of the arc
    g.append("path")
      .attr("d", arc)
      .style("fill", function(d) {
        return color(d.data.track_name)
      })
      .transition()
      .ease(d3.easeLinear)
      .duration(2000)
      .attrTween("d", pieTween)

    // append the text (labels)
    g.append("text")
      .transition()
      .ease(d3.easeLinear)
      .duration(2000)
      .attr("transform", function(d) {
        return "translate(" + labelArc.centroid(d) + ")"
      })
      .attr("dy", ".35em")
      .text(function(d) { return d.data.track_name})
})