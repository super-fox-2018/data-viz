import * as d3 from "d3";

let dataset = [5,10,13,30]

// d3.select('body').selectAll('div')
//     .data(dataset)
//     .enter()
//     .append('div')
//     .attr('class','bar')
//     .attr('width',100)
//     .style('height',function(d){
//         console.log("ini D, keluarnya apa?",d)
//         return d * 5 + 'px'
//     })

const svg = d3.select('#chartArea').append('svg')
    .attr('width',800)
    .attr('height',500)
    .style('background','#cacaca')

console.log("SVG",svg)

svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('class','bar')
    .attr('x',(datanya,index)=>{
        console.log("INI D di X",datanya)
        console.log("INI i di X",index)
        return index*22
    })
    .attr('y',function(d){
        return 500 - d * 20
        console.log("INI D di y",d)
    })
    .attr('width',20)
    .attr('height',function(d){
        return d * 20
        console.log("ini D di height",d)
        // console.log("apaan nih multiplier",multiplier)
    })
    .style('color','#ffffff')