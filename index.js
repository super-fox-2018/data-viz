import * as d3 from "d3";

var count =0
d3.csv('oec.csv',function(planets){
    // console.log(planets)
    // console.log(planets.splice(10))
    return planets
})
.then(planets2=>{
    console.log("PLANETS2",planets2)
    // console.log("PLANETS 2",planets2)
    // count++
    if(count<=10){
    const svg = d3.select('#chartArea')
        .append('svg')
        .attr('width',1000)
        .attr('height',1000)
        .style('background','#cacaca')
    
    var color = d3.scaleLinear()
    .domain([0,1500])
    .range(['red','white'])

    console.log("ISINYA COLOR",color)

    const outerCircle = 
    svg.selectAll('g')
    .data(planets2)
    .enter()
    .append('g')
    
    outerCircle.append('circle')
    .attr('class',"bubble")
    .attr('r',function(d){
        return 50 * d.RadiusJpt
    })
    .attr('cy',function(d){
        if(d.DistFromSunParsec !==""){
            return Math.random()*1000
        }
        else{
            return 500
        }
        
    })
    .attr('cx',function(d){
        if(d.DistFromSunParsec!==""){
            return Math.random()*1000
        }
        else{
            return 100
        }
    })
    .attr('fill',function(d,i){
        return color(i)
    })
    .style('transparency',"30%")
    .style('border-radius','50%')
    .style('display','inline-block')

    // outerCircle.append('text')
    // .attr('y','50%')
    // .attr('x','50%')
    // .text(function(d){
    //     return d.PlanetIdentifier
    // })
    // .attr("font-family", "sans-serif")
    // .attr("font-size", "20px")
    // .attr("fill", "black")
    // .style('text-anchor','middle')
    } 

})
.catch(err=>{
    console.log(err)
})
// let dataset = []
// d3.csv('oec.csv',function(planets){
//     console.log('----')
//     dataset.push(planets)
// }).th

// console.log(dataset)




// let container = d3.select('#chartArea')
//     .append('div')

// container.data()
//     .enter()
//     .attr('x', (d3,i ))