// import * as d3 from 'd3';

const margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

const x = d3.scaleBand()
  .rangeRound([0, width])
  .padding(0.1)

const y = d3.scaleLinear()
  .range([height, 0]);

// const xAxis = d3.svg.axis()
//   .scale(x)
//   .orient("bottom");

// const yAxis = d3.svg.axis()
//   .scale(y)
//   .orient("left");

const svg = d3.select('#chartArea').append('svg')
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + 275 + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3
  .csv('AnimeList.csv')
  .then(dataset => {
    let re = /shounen/gi
    let reNotYet = /Not/gi
    let shounen = dataset.filter(data => {
      let airedFrom = data.aired_string.split(' to ')[0]
      let airedYear = new Date(airedFrom).getFullYear()
      return re.test(data.genre) && airedYear == 2018 && !reNotYet.test(data.status)
            && data.score != 0
    }) 

    console.log('==========shounen============');
    console.log(shounen);
    let scores = shounen.map(el => el.score)
    let titles = shounen.map(el => el.title)
    console.log(scores);
    console.log(titles);
    
    let columns = []
    titles.forEach((el, i) => {
      let arr = []
      arr.push(titles[i], Number(scores[i]))
      columns.push(arr)
    })
    console.log(columns);

    x.domain(titles)
    y.domain([0, d3.max(scores)])

    console.log('------x------');
    console.log(x);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Title");

    // console.log(svg.selectAll('g'));
    d3.select('body').select('#chartArea').select('svg').select('g').select('.x.axis').selectAll('.tick')
      .select('text').attr('x', 150);

    svg.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Scores")

    const color = d3.scaleLinear()
      .range(['pink', 'red'])
      .domain([d3.min(scores), d3.max(scores)])

    // const color = d3.scaleOrdinal(d3.schemeCategory10)

    svg.selectAll(".dot")
      .data(shounen)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", d => x(d.title) + 15)
      .attr("cy", d => y(d.score))
      .style("fill", d => {
        return color(d.score)
      });

    // var legend = svg.selectAll(".legend")
    //   .data(color.domain())
    //   .enter()
    //   .append("g")
    //   .attr("class", "legend")
    //   .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });


    // svg.selectAll('rect')
    //   .data(scores)
    //   .enter()
    //   .append('rect')
    //   .attr('class', 'bar')
    //   .attr('width', 20)
    //   .attr('height', d => d * 20)
    //   .attr('x', (d, i) => i * 25)
    //   .attr('y', d => 300 - d * 20)

    // svg.selectAll('p')
    //   .data(titles)
    //   .enter()
    //   .append('p')
    //   .attr('class', 'title')
    //   .attr('x', (d, i) => i * 25)
    //   .attr('y', d => 300 - d * 20)

    // let chart = c3.generate({
    //   bindto: '#chartArea',
    //   data: {
    //     columns
    //   },
    //   axis: {
    //     x: {
    //       label: 'Titles'
    //     },
    //     y: {
    //       label: 'Scores'
    //     }
    //   }
    // })
    // console.log(chart);
  })