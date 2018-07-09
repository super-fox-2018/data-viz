const PokemonData = []
const damage = []

  d3.csv('/data/Pokemon.csv')
  .then(function (data) {
    data = data
    data.forEach(val => {
      const Pokemon = {
        name: val.Name.split(' ')[0],
        damage: val.Attack
      }
      PokemonData.push(Pokemon)
      damage.push(Pokemon.damage)
    })
    const maxDamage = Math.max(...damage)
    const biggestDamage = []
    const heroDamage = []

    for (let i = 0; i < PokemonData.length; i++) {
      if (PokemonData[i].damage >= 165) {
        biggestDamage.push(PokemonData[i])
        heroDamage.push(PokemonData[i].damage)
      }
    }

    const svg=d3.select('#svg')
      .data(PokemonData)
      .attr('width', `${100}%`)
      .attr('height', 300)
      .style('background-color', '#ffffff')

    const padding={
      top: 20,
      right: 30,
      bottom: 30,
      left: 50
    }

    var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

    const chartArea = {
      'width':parseInt(svg.style("width"))-padding.left-padding.right,
      'height':parseInt(svg.style("height"))-padding.top-padding.bottom,
    }

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(biggestDamage, function(d, i) {
          return d.damage
        })
      ])
      .range([chartArea.height, 0]).nice()
      .domain([d3.max(heroDamage), 150])
      .range([0, 300])

    const colorScale = d3.scaleLinear()
      .domain([150, d3.max(heroDamage)])
      .range(['peru', 'teal'])

    const xScale = d3.scaleBand()
      .domain(biggestDamage.map(function(d){
        return d.name
      }))
      .range([0, chartArea.width])
      .padding(.2)

    const xAxis = svg.append('g')
      .classed('xAxis', true)
      .attr(
        'transform', 'translate('+padding.left+','+(chartArea.height + padding.top)+')'
      )
      .call(d3.axisBottom(xScale))

    const yAxisFn=d3.axisLeft(yScale)
    const yAxis=svg.append('g')
      .classed("yAxis", true)
      .attr(
        'transform', 'translate('+padding.left+','+padding.top+')'
      )
      yAxisFn(yAxis)

    const rectGrp = svg.append('g')
      .attr(
        'transform', 'translate('+padding.left+','+padding.top+')'
      )


    rectGrp.selectAll('rect')
    .data(biggestDamage)
    .enter()
    .append('rect')
    .attr('width', 100)
    .attr('height', function (d,i) {
      return chartArea.height-yScale(d.damage)
    })
    .attr('x', function (d, i) {
      return xScale(d.name)
    })
    .attr('y', function (d, i) {
      return yScale(d.damage)
    })
    .attr('fill', '#ffd600')
    .on('mouseover', function (d, i) {
      d3.select(this)
        .style('fill', '#b71c1c')
        .style('cursor', 'pointer')
        div.transition()
            .duration(200)
            .style("opacity", 9);
        div	.html("<br/> <b>" + '<span class=fullname>'+ (d.name)
                  +"</br> <br/> <span class=name>" + (d.name.split(' ').slice(1).join(' '))
                + "</span> </b>  <b> Damage: <span class='name'>" + d.damage + "</span></b> <br/>" )
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    })
    .on('mouseout', function (d, i) {
      d3.select(this).style('fill', '#ffd600')
      div.transition()
        .duration(500)
        .style("opacity", 0);
    })

  })


// =========================================================================


// ============================================> dah jadi
// const svg = d3.select('#chartArea')
//   .data(dataset)
//   .append('svg')
//   .attr('width', `${100}%`)
//   .attr('height', 300)
//   .style('background-color', '#cacaca')

// const PokemonData = []
// const damage = []
//
//   d3.csv('/data/Pokemon.csv')
//   .then(function (data) {
//     data = data.slice(0, 57)
//     data.forEach(val => {
//       const Pokemon = {
//         name: val.Name,
//         damage: val.Attack
//       }
//       PokemonData.push(Pokemon)
//       damage.push(Pokemon.damage)
//     })
//
//     const yScale = d3.scaleLinear()
//       .domain([0, d3.max(damage)])
//       .range([0, 300])
//
//     const colorScale = d3.scaleLinear()
//       .domain([0, d3.max(damage)])
//       .range(['peru', 'teal'])
//
//     svg.selectAll('rect')
//       .data(damage)
//       .enter()
//       .append('rect')
//       .attr('class', 'bar')
//       .attr('x', (d, index) => {
//         return index * 22
//       })
//       .attr('y', (d) => {
//         return 300 - yScale(d)
//       })
//       .attr('width', 20)
//       .attr('height', (d) => {
//         return yScale(d)
//       })
//       .attr('fill', colorScale)
//       .on('mouseover', function (d, i) {
//         d3.select(this)
//           .style('fill', 'blue')
//           .style('cursor', 'pointer')
//       })
//       .on('mouseout', function (d, i) {
//         d3.select(this).style('fill', colorScale(d))
//       })
//
//   })
// ==========================================================^

// console.log(data);
// .then(function (data) {
//   console.log('data');
// })

// d3.select('body')
//   .selectAll('div')
//   .data(PokemonData)
//   .enter()
//   .append('div')
//   .attr('class', 'bar')
//   .style('height', function (d) {
//     return `${d * 5}px`
//   })
//   .style('width', function (d) {
//     return `${30}px`
//   })

// svg.selectAll('rect')
//   .data(PokemonData)
//   .enter()
//   .append('rect')
//   .attr('class', 'bar')
//   .attr('x', (d, index) => {
//     return index * 22
//   })
//   .attr('y', (d) => {
//     return 300 - d
//   })
//   .attr('width', 20)
//   .attr('height', (d) => {
//     return d * 5
//   })
// ============================================== >


// ========================================================= <
// const chartArea = {
//   'width':parseInt(svg.style('width'))
// }
