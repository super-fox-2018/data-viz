d3.csv('fifa_ranking.csv')
	.then(fifa_ranking => {
		let fifa_ranking_data = fifa_ranking.slice(0, 10).sort((a, b) => {
			return b.previous_points - a.previous_points
		})
		const dataset = []
		fifa_ranking_data.forEach(data_fifa_ranking => {
			dataset.push(data_fifa_ranking.previous_points)
		});

		d3.select('#chartBar')
			.selectAll('div')
			.data(fifa_ranking_data)
			.enter()
			.append('div')
			.transition().duration(800)
			.attr('class', 'bar')
			.text(function (fifa_ranking_data, i) {
				let NewRangk = i + 1
				return `New Rangking= ${NewRangk} Old Rangking= ${fifa_ranking_data.rank} ${fifa_ranking_data.country_full} [${fifa_ranking_data.country_abrv}] ${fifa_ranking_data.previous_points} points`
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
//-----------------------------------------------------------------------------------------------


const svg = d3.select('#chartBar1')
	.append('svg')
	.attr('width', 800)
	.attr('height', 500)
	.style('background', '#cacaca')

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

d3.csv('world_cups.csv')
	.then(dataWC => {
		dataWC.sort((a, b) => {
			return a.GoalsScored - b.GoalsScored
		})

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

		svg
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
				return 320 - GoalsScored - 30
			})
			.attr('width', 30)
			.transition()
			.duration(750)
			.delay(function (d, i) {
				return i * 10;
			})
			.attr('height', ({
				GoalsScored
			}) => {
				return GoalsScored * 50
			})

		svg
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

		svg
			.append('g')
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x));

		svg
			.append('g')
			.call(d3.axisLeft(y));

		const svgLegend = d3.select('#chartBar2')
			.append('svg')
			.attr('width', 800)
			.attr('height', 620)
			.style('background', '#cacaca')

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
				return i * 30
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
				return i * 33 - (i + 15)
			})
			.text(({
				GoalsScored
			}) => {
				return GoalsScored
			})

	})
	.catch(err => {
		throw err
	})

//-----------------------------------------------------------------------------------------------