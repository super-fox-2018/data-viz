import * as d3 from 'd3'
const margin = { left: 40, right: 10, bottom: 30, top: 20 }

const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const svg = d3.select('#chartArea')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .style('background', '#cacaca')
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.csv('WorldCups.csv')
    .then(dataset => {
        const colorScale = d3.scaleLinear()
                           .domain([0, d3.max(dataset, d => Number(d.GoalsScored))])
                           .range(['peru','green'])
        const x = d3.scaleBand()
            .domain(dataset.map(d => d.Year))
            .range([margin.left, width - margin.right])
            .padding(0.1)

        const y = d3.scaleLinear()
            .domain([0, d3.max(dataset, d => Number(d.GoalsScored))]).nice()
            .range([height - margin.bottom, margin.top])

        const xAxis = g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x)
                .tickSizeOuter(0))

        const yAxis = g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
            .call(g => g.select(".domain").remove())

        svg.append("g")
            .attr("fill", "steelblue")
            .selectAll("rect").data(dataset).enter().append("rect")
            .attr("x", d => x(d.Year))
            .attr("y", d => y(d.GoalsScored))
            .attr("height", d => y(0) - y(Number(d.GoalsScored)))
            .attr("width", x.bandwidth())
            .attr("fill", d => colorScale(d.GoalsScored))

        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);


        // text label for the x axis
        svg.append("text")
            .attr("transform",
                "translate(" + (width / 2) + " ," +
                (height + margin.top) + ")")
            .style("text-anchor", "middle")
            .text("Year");

        //text label for the y axis
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Goal Score");

    })