let dataset = []


// d3.csv('CompleteDataset.csv')
//   .then((value)=>{
//     let footballer = []
//     for(var i = 0 ; i < 60 ; i++){
//         footballer.push(value[i])
//     };
//
//
//     let footballerData = []
//     for(var i = 0 ; i < footballer.length ; i++){
//         let data = {}
//         let test = Math.round(+(footballer[i].Value.substring(1,footballer[i].Value.length-1)))
//         data = { name: footballer[i].Name, value: test, country : footballer[i].Nationality }
//         dataset.push(data)
//     }
//
//     const yScale = d3.scaleLinear()
//       .domain([0,100])
//       .range([0,250])
//
//     const colorScale = d3.scaleLinear()
//       .domain([0,125])
//       .range(['white','red'])
//
//     const svg = d3.select('#chartArea').append('svg')
//       .attr('width', 1500)
//       .attr('height',300)
//       .style('background','#cacaca')
//
//     svg.selectAll('rect')
//       .data(dataset)
//       .enter()
//       .append('rect')
//       .text((d)=>{
//         return d.value
//       })
//       .attr('class','bar')
//       .attr('x' , (d,i)=>{
//         return i*22
//       })
//       .attr('y',(d)=>{
//         return 300 - yScale(d.value)
//       })
//       .attr('width' , 20)
//       .attr('height',(d)=>{
//         return yScale(d.value)
//       })
//       .attr('fill',d=>{
//         return colorScale(d.value)
//       });
//
//   })

  //

  d3.csv('CompleteDataset.csv')
    .then((value)=>{
      let footballer = []
      for(var i = 0 ; i < 15 ; i++){
          footballer.push(value[i])
      };


      let footballerData = []
      for(var i = 0 ; i < footballer.length ; i++){
          let data = {}
          let test = Math.round(+(footballer[i].Value.substring(1,footballer[i].Value.length-1)))
          data = { name: footballer[i].Name, value: test, country : footballer[i].Nationality }
          dataset.push(data)
      }

      var margin = ({top: 20, right: 0, bottom: 30, left: 40})
      var width = 800
      var height = 500

      const x = d3.scaleBand()
        .domain(dataset.map(d => d.name))
        .range([margin.left, width - margin.right])
        .padding(0.1)

      const y = d3.scaleLinear()
        .domain([0, d3.max(dataset, d => d.value)]).nice()
        .range([height - margin.bottom, margin.top])

      const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x)
            .tickSizeOuter(0))

      const yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select(".domain").remove())

      const svg = d3.select('#chartArea').append('svg')
        .attr('width', width)
        .attr('height',600)
        .style('background','#cacaca')

      const colorScale = d3.scaleLinear()
        .domain([0,125])
        .range(['white','red'])

      svg.append("g")
        .selectAll("rect")
        .attr("class","bar")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", d => x(d.name))
        .attr("y", d => y(d.value))
        .attr("height", d => y(0) - y(d.value))
        .attr("width", x.bandwidth())
        .attr("fill",d => {
          return colorScale(d.value)
        })
        .on('mouseover', function (d, index) {
          d3.select(this).attr('fill', 'blue')
        })
        .on('mouseout', function (d, index) {
          d3.select(this).attr('fill', d => {
            return colorScale(d.Rating)
          })
        })

      svg.append("g")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65  )");

      svg.append("g")
          .call(yAxis);

    })
