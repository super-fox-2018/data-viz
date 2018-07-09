import * as d3 from "d3"

let height = 600
let width = 1500

let svg = d3
.selectAll('svg')
.attr('height', height)
.attr('width', width)

d3.csv('./2016 School Explorer.csv')
.then(dataset=>{
    let data = {}
    let dataArray = []

    let loadAllData = function (){
        Object.keys(data).forEach(el=>{
            let object = {}
            object[el] = data[el]
            dataArray.push(object)
        })
        let MaxValue = Math.max(...Object.values(data))
        let scaleWidth = d3.scaleLinear()
            .domain([1,MaxValue])
            .range([5,MaxValue*0.3])
        let scaleColor = d3.scaleLinear()
            .domain([0,MaxValue])
            .range([`rgba(${Math.round(Math.random()*255+30)},${Math.round(Math.random()*255+30)},${Math.round(Math.random()*255+30)},${Math.random()+0.5})`,`rgba(${Math.round(Math.random()*255+30)},${Math.round(Math.random()*255+30)},${Math.round(Math.random()*255+30)},${Math.random()+0.5})`])
        
        let scaleX = d3.scaleLinear()
        .domain([0,MaxValue])
        .range([50,width - 500])

        svg        
        .selectAll('circle')
        .data(dataArray)
        .enter()
        .append('circle')
        .attr('cx',(d) => scaleX(d[Object.keys(d)[0]]))
        .attr('cy',function(){
            return Math.random()*300+100
        })
        .attr('r', (d) => scaleWidth(d[Object.keys(d)[0]]))
        .style('fill',(d) => scaleColor(d[Object.keys(d)[0]]))
        .style('stroke','white')
        
        svg.selectAll('circle')
        .on('mouseover',function(d, i){
            let thisX = d3.select(this).attr("cx")
            let thisY = d3.select(this).attr("cy")
            d3.select(this)
            .attr('r', (d)=> scaleWidth(d[Object.keys(d)[0]]) * 1.3)
            .style('fill', 'orange')
            svg.append("text")
            .text(function() {
                return `${Object.keys(d)[0]} ---- ${d[Object.keys(d)[0]]} schools`
            })
            .attr('id', "t"+i)
            .attr('x', thisX-30)
            .attr('y', thisY-30)
        })
        .on('mouseout',function(d,i){
            d3.select(this)
            .attr('r', (d)=> scaleWidth(d[Object.keys(d)[0]]))
            .style('fill', (d) => scaleColor(d[Object.keys(d)[0]]))
    
            d3.select("#t" + i).remove()
        })
    }

    let filterByTrustPercentage = function(){
        d3.select('#filterTitle')
        .html('School Trust Percentage')
        svg.selectAll('circle')
        .remove()
        data = { "<= 80%":0, "<= 85%":0, "<= 90%":0, "<= 92%":0, "<= 95%":0, "<= 97%":0, "> 95%": 0 }
        dataArray = []
        dataset.forEach(el=>{
            el = +el['Student Attendance Rate'].replace('%','')
            if(el <= 80){
                data["<= 80%"]++
            } else if(el <= 85){
                data["<= 85%"]++
            } else if(el <= 90){
                data["<= 90%"]++
            } else if(el <= 92){
                data["<= 92%"]++
            } else if(el <= 95){
                data["<= 95%"]++
            } else if(el <= 97){
                data["<= 97%"]++
            } else {
                data["> 95%"]++
            }
        })
        loadAllData()
    }

    let filterByAttendanceRate = function(){
        d3.select('#filterTitle')
        .html('Student Attendance Rate')
        svg.selectAll('circle')
        .remove()
        data = { "<= 80%":0, "<= 85%":0, "<= 90%":0, "<= 92%":0, "<= 95%":0, "<= 97%":0, "> 95%": 0 }
        dataArray = []
        dataset.forEach(el=>{
            el = +el['Student Attendance Rate'].replace('%','')
            if(el <= 80){
                data["<= 80%"]++
            } else if(el <= 85){
                data["<= 85%"]++
            } else if(el <= 90){
                data["<= 90%"]++
            } else if(el <= 92){
                data["<= 92%"]++
            } else if(el <= 95){
                data["<= 95%"]++
            } else if(el <= 97){
                data["<= 97%"]++
            } else {
                data["> 95%"]++
            }
        })
        loadAllData()
    }

    let filterByCity = function (){
        d3.select('#filterTitle')
        .html('City')
        svg.selectAll('circle')
        .remove()
        data = {}
        dataArray = []
        dataset.forEach(el=>{
            if(!data[el.City]){
                data[el.City] = 1
            } else {
                data[el.City]++
            }
        })
        loadAllData()
    }

    let incomeEst = function (){
        d3.select('#filterTitle')
        .html('School Income Estimation')
        svg.selectAll('circle')
        .remove()
        data = {"N/A":0,"<= 10000":0, "<= 15000":0, "<= 25000":0, "<= 30000":0, "<= 35000":0, "<= 40000":0, "<= 50000":0, "<= 60000":0, "<= 70000":0, "<= 90000":0, "> 90000":0}
        dataArray = []
        dataset.forEach(el=>{
            el = el['School Income Estimate'].replace('$','').replace(',','').replace('N/A', 0).trim()
            if(el === 0){
                el['N/A']++
            } else if(el <= 10000 && el > 0){
                data['<= 10000']++
            } else if(el <= 15000){
                data['<= 15000']++
            } else if(el <= 25000){
                data['<= 25000']++
            } else if(el <= 30000){
                data['<= 30000']++
            } else if(el <= 35000){
                data['<= 35000']++
            } else if(el <= 40000){
                data['<= 40000']++
            } else if(el <= 50000){
                data['<= 50000']++
            } else if(el <= 60000){
                data['<= 60000']++
            } else if(el <= 70000){
                data['<= 70000']++
            } else if(el <= 90000){
                data['<= 90000']++
            } else {
                data['> 90000']++
            }
        })
        loadAllData()
    }
    d3.select('#incomeEstimationFilter')
    .on('click',function(){
        incomeEst()
    })

    d3.select('#cityFilter')
    .on('click',function(){
        filterByCity()
    })

    d3.select('#attendanceRateFilter')
    .on('click',function(){
        filterByAttendanceRate()
    })

    d3.select('#trustPercentageFilter')
    .on('click',function(){
        filterByTrustPercentage()
    })
    incomeEst()


})
.catch(error=>{
    console.log(error)
})


