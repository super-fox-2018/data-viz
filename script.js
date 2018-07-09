// import d3 from "d3";

const datas = []
d3.csv('./cwurData.csv', function(item) {
  let result = {
    institution: item.institution,
    score: item.score
  }
  datas.push(result)
}).then(function () {
  let data = datas.slice(0,11)
  const svg = 
  d3.select('#chartArea').append('svg')
  .attr('width', 2500)
  .attr('height', 500)
  .style('background', '#cacaca')
  
  const margin = {
    top: 20,
    right: 0,
    bottom: 30,
    left: 40,
  }
  const height = 500
  const width = 2000
  const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.score)]).nice()
  .range([height - margin.bottom, margin.top])

  const x = d3.scaleBand()
    .domain(data.map(d => d.institution))
    .range([margin.left, width - margin.right])
    .padding(0.5)

  const xAxis = g => g
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(d3.axisBottom(x)
      .tickSizeOuter(0))

  const yAxis = g => g
  .attr("transform", `translate(${margin.left},0)`)
  .call(d3.axisLeft(y))
  .call(g => g.select(".domain").remove())

  const colorScale = d3.scaleLinear()
    .domain([50, d3.max(data, (d) => d.score)])
    .range(['red', 'green'])

  svg.append("g")
    .attr("fill", "steelblue")
    .selectAll("rect").data(data).enter().append("rect")
    .attr("x", d => x(d.institution))
    .attr("y", d => y(d.score))
    .attr("height", d => y(0) - y(d.score))
    .attr("width", x.bandwidth())
    .attr('fill', (d) => colorScale(d.score))
    .on('mouseover', function(d,i){
      d3.select(this).style('fill', 'pink')
    })
    .on('mouseout', function(d,i){
      d3.select(this).style('fill', (d) => colorScale(d.score))
    })

  svg.append("g")
      .call(xAxis);
  
  svg.append("g")
      .call(yAxis);



})

// let dataset = [5, 10, 34, 20, 25]

// console.log(d3.select('body'));




// d3.select('body').selectAll('div')

