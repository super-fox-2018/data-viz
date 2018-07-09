d3.csv('fifa_ranking.csv')
	.then(fifa_ranking => {
		let fifa_ranking_data = fifa_ranking.slice(0, 10).sort((a, b) => {
			return b.previous_points - a.previous_points
		})
		const dataset = []
		fifa_ranking_data.forEach(data_fifa_ranking => {
			dataset.push(data_fifa_ranking.previous_points)
		});

		const svg = d3.select('#chartBar')
			.selectAll('div')
			.data(fifa_ranking_data)
			.enter()
			.append('div')
			.transition().duration(1000)
			.attr('class', 'bar')
			.text(function (fifa_ranking_data, i) {
				let NewRangk = i + 1
				return `New Rangk= ${NewRangk}; Old Rangk= ${fifa_ranking_data.rank}; ${fifa_ranking_data.country_full} [${fifa_ranking_data.country_abrv}] ${fifa_ranking_data.previous_points} points`
			})
			.style('width', function (fifa_ranking_data) {
				return fifa_ranking_data.previous_points * 10 + 'px'
			})
			.style('height', function (fifa_ranking_data) {
				return fifa_ranking_data.previous_points * 0.5 + 'px'
			})
	})
	.catch(err => {
		throw err
	})
//-----------------------------------------------------------------------------------------------∫

d3.csv('world_cups.csv')
	.then(dataWC => {
		dataWC.sort((a, b) => {
			return a.GoalsScored - b.GoalsScored
		})
		const svg1 = d3.select('#chartBar1')
			.append('svg')
			.attr('width', 800)
			.attr('height', 500)
			.style('background', '#b0e0e6')

		const margin = {
			top: 50,
			right: 50,
			bottom: 20,
			left: 20
		}
		const width = 870 - margin.left - margin.right
		const height = 550 - margin.top - margin.bottom


		const x = d3.scaleBand()
			.range([0, width])

		const y = d3.scaleBand()
			.range([height, 0])

		x.domain(dataWC.map(function (d) {
			return d.Year
		}))

		y.domain([0, d3.max(dataWC, function (d) {
			return d.GoalsScored
		})])

		let min = +dataWC[0].GoalsScored
		let max = +(dataWC[dataWC.length - 1].GoalsScored)

		const colorScale = d3.scaleLinear()
			.domain([min, max])
			.range(['red', 'green'])

		svg1
			.selectAll('rect')
			.data(dataWC)
			.enter()
			.append('rect')
			.attr('class', 'bar1')
			.attr('padding-left', 30)
			.attr('fill', ({
				GoalsScored
			}) => {
				return colorScale(GoalsScored)
			})
			.attr('x', (d, i) => {
				return i * 40
			})
			.attr('y', ({
				GoalsScored
			}) => {
				return (320 - GoalsScored) - 30
			})
			.attr('width', 30)
			.transition()
			.duration(1000)
			.delay(function (d, i) {
				return i * 10;
			})
			.attr('height', ({
				GoalsScored
			}) => {
				return GoalsScored * 50
			})

		svg1
			.selectAll('text')
			.data(dataWC)
			.enter()
			.append('text')
			.attr('class', 'text-rotate')
			.attr('x', (d, i) => {
				return i * 40 + 15
			})
			.attr('y', ({
				GoalsScored
			}) => {
				return 300 - GoalsScored
			})
			.text(({
				GoalsScored
			}) => {
				return GoalsScored
			})

		// svg1
		// 	.append('g')
		// 	.attr("transform", "translate(0," + height + ")")
		// 	.call(d3.axisBottom(x) );

		// svg1
		// 	.append('g')
		// 	.call(d3.axisLeft(y));

		const svgLegend = d3.select('#chartBar2')
			.append('svg')
			.attr('width', 250)
			.attr('height', 620)
			.style('background', '#b0e0e6')

		svgLegend
			.selectAll('rect')
			.data(dataWC)
			.enter()
			.append('rect')
			.attr('class', 'legend')
			.attr('fill', ({
				GoalsScored
			}) => {
				return colorScale(GoalsScored)
			})
			.attr('x', (d, i) => {
				return 10
			})
			.attr('y', (d, i) => {
				return i * 31
			})
			.attr('width', 15)
			.attr('height', 15)

		svgLegend
			.selectAll('text')
			.data(dataWC)
			.enter()
			.append('text')
			.attr('x', (d, i) => {
				return 30
			})
			.attr('y', (d, i) => {
				return i * 32 - (i - 15)
			})
			.text(({
				Year,
				GoalsScored
			}) => {
				return [`Year: ${Year}, Total: ${GoalsScored} goal`]
			})

	})
	.catch(err => {
		throw err
	})

//-----------------------------------------------------------------------------------------------
d3.csv('world_cups.csv')
	.then(dataWC => {
		dataWC.sort((a, b) => {
			return a.Year - b.Year
		})
		const data = [{
			"letter": "q",
			"presses": 1
		}, {
			"letter": "w",
			"presses": 5
		}, {
			"letter": "e",
			"presses": 2
		}]
		const width = 800,
			height = 800,
			radius = Math.max(width, height) / 2
		const color = d3.scaleOrdinal()
			.range(["green", "red", "blue", "grey", "magenta", "pink", "brown", "silver", "yellow", "maroon"])
		const pie = d3.pie()
			.value(function (d) {
				return d.GoalsScored
			})(dataWC)
		const arc = d3.arc()
			.outerRadius(radius - 70)
			.innerRadius(0)
		const labelArc = d3.arc()
			.outerRadius(radius - 100)
			.innerRadius(radius - 40)
		const svg1 = d3.select("#chartPie")
			.append("svg")
			.attr("width", 1000)
			.attr("height", height)
			.append("g")
			.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
		const g = svg1.selectAll("arc")
			.data(pie)
			.enter().append("g")
			.attr("class", "arc")
		g.append("path")
			.transition().duration(1000)
			.attr("d", arc)
			.style("fill", function (d) {
				return color(d.data.GoalsScored)
			})
		g.append("text")
			.transition().duration(1000)
			.attr("transform", function (d) {
				return "translate(" + labelArc.centroid(d) + ")"
			})
			.text(function (d) {
				return `Year: ${d.data.Year}, Goal: ${d.data.GoalsScored}`
			})
			.style("fill", "black")
	})
	.catch(err => {
		throw err
	})