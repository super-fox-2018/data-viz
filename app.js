import * as d3 from "d3";

// let dataset = [5,10,15,20,25]
// d3.select('body').selectAll('div')
//     .data(dataset)
//     .enter()
//     .append('div')
//     .attr('class','bar')
//     .style('height', function(d) {
//         return d * 10 + 'px'
//     })

// let dataset = [5,10,15,20,25]

// const svg = d3.select('#chartArea').append('svg')
//    .attr('width', 400)
//    .attr('height', 300)
//    .style('background', '#cacaca')

// svg.selectAll('rect')
//     .data(dataset)
//     .enter()
//     .append('rect')
//     .attr('class','bar')
//     .attr('x', (d,i)=>{
//         // console.log(i,"hohoo");
//         // console.log(d,"heheh");
//         return i * 25
//     })
//     .attr('y',(d) =>{
//         // console.log(d);
//         return 300 - d*5
//     })
//     .attr('width',20)
//     .attr('height',(d)=>{
//         return d * 5
//     })
  
d3.csv('AppleStore.csv')
.then(data=>{
    // console.log(data);
    let dataset =[]
    let count1 = 0
    let count2 = 0
    let count3 = 0
    let count4 = 0
    let count5 = 0
    data.forEach(function(app){
        // console.log(app)
        if(Number(app.user_rating)<=1 ) {
            count1++
        }else if(Number(app.user_rating)>1 && Number(app.user_rating)<=2)  {
            count2++
        }else if(Number(app.user_rating)>2 && Number(app.user_rating)<=3) {
            count3++
        }else if(Number(app.user_rating)>3 && Number(app.user_rating)<=4) {
            count4++
        }else{
            count5++
        }
    })
    let rating1 = {rating:1,total:count1}
    dataset.push(rating1)
    let rating2 = {rating:2,total:count2}
    dataset.push(rating2)
    let rating3 = {rating:3,total:count3}
    dataset.push(rating3)
    let rating4 = {rating:4,total:count4}
    dataset.push(rating4)
    let rating5 = {rating:5,total:count5}
    dataset.push(rating5)


    let margin = {
        top: 20,
        right: 0,
        bottom: 30,
        left: 40,
    }

    let width = 400
    let height = 300

    const yscale = d3.scaleLinear()
        .domain([0,d3.max(dataset, d => d.total)])
        .range([0,250])

    let x = d3.scaleBand()
    .domain(dataset.map(d => d.rating))
    .range([margin.left, width - margin.right])
    .padding(0.1)

    let y = d3.scaleLinear()
    .domain([0, d3.max(dataset, d => d.total)]).nice()
    .range([height - margin.bottom, margin.top])

    let xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x)
        .tickSizeOuter(0))

    let yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())


    console.log(dataset)
 
    const svg = d3.select('#chartArea').append('svg')
    .attr('width',400)
    .attr('height',300)
    .style('background','#cacaca')
    
    let colorScale = d3.scaleLinear()
        .domain([0,3155])
        .range(['green','red'])
   
    svg
    .append('g')
    .selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('class','bar')
    .attr("x", d => x(d.rating))
    .attr("y", d => y(d.total))
    .attr("width", x.bandwidth())
    .attr("height", d => y(0) - y(d.total))
    .attr('fill', function (d) {
        return colorScale(d.total)
    })
    .on('mouseover',function(d,i) {
        d3.select(this).style('fill', 'white')
    })
    .on('mouseout',function(d,i){
        d3.select(this).style('fill',function(d) {
            return colorScale(d.total)
        })
    })

    svg.append("g")
      .call(xAxis);
  
    svg.append("g")
      .call(yAxis);
      
      

    console.log(colorScale,"xx")
}) 
