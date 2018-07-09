import * as d3 from "d3";

var svg = d3.select("svg")
    .attr('width',400)
    .attr('height',300) 

var format = d3.format(",d")
var color = d3.scaleOrdinal(d3.schemaCategory20c)
var count=0

d3.csv("oec.csv",function(d){
    count++
    if(count<=50){
        console.log("PLANET NAME",d.PlanetIdentifier)
        // console.log('data oec',d)
    }
},function(err,classes){
    count++
    if(count<=50){
        // console.log("THIRD PARAMETER",tes)
        var root = d3.hierarchy({children: classes})
            .sum(function(d) { 
                //return smua isi di var classes
                console.log("D di SUM",d)
            })
            .each(function(d) {
                //dia bisa akses parent2nya jg deh kayanya
                console.log("D di each",d)
            if (id = d.data.id) {
                var id, i = id.lastIndexOf(".");
                d.id = id;
                d.package = id.slice(0, i);
                d.class = id.slice(i + 1);
            }
            });

            var node = svg.selectAll(".node")
                .data(root.leaves())
                .enter().append("g")
                .attr("class", "node")
                .style("background","#cacaca")
                .attr("transform", function(d) { 
                    console.log("D DI ATTR TRANSFORM",d)
                    return "translate(" + 100 + "," + 100 + ")"; 
                });
                
            
            node.append("circle")
            .attr("id", function(d) { 
                console.log("IDNYA",d) 
            })
            
            .attr("r", function(d) { return d.r; })
            .style("fill", function(d) { 
                console.log("D di STYLE FILL",d)
                return color(d.color); 
            });

            node.append("clipPath")
            .attr("id", function(d) { return "clip-" + d.id; })
            .append("use")
            .attr("xlink:href", function(d) { return "#" + d.id; });


            node.append("text")
            .attr("clip-path", function(d) { return "url(#clip-" + d.id + ")"; })
            .selectAll("tspan")
            .data(function(d) { return d.class.split(/(?=[A-Z][^A-Z])/g); })
            .enter().append("tspan")
            .attr("x", 0)
            .attr("y", function(d, i, nodes) { return 13 + (i - nodes.length / 2 - 0.5) * 10; })
            .text(function(d) { return d; });
                // console.log('data oec',d)
            }


    
})
    

// var classes = [
//     { id: '1', value: 1, color: '#42f445' },
//     { id: '2', value: 2, color: '#f44141' },
//     { id: '3', value: 3, color: '#42f445' },
//     { id: '4', value: 4, color: '#f44141' },
//     { id: '5', value: 5, color: '#42f445' },
//     { id: '6', value: 6, color: '#f44141' },
//     { id: '7', value: 7, color: '#42f445' }
// ];

