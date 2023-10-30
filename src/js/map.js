const API_URL = 'https://testing.jazzserve.com:8020';

const width = window.innerWidth;
const height = 600;
let centered, clicked_point;

var projection = d3.geoMercator()


var drag_map = d3.drag()
	.on("drag", function () {
		drag_map.on("drag", null);
	});

var svg_map;

if (window.innerWidth < 933) {
	svg_map = d3.select(".map").append("svg")
		.attr("width", '100%')
		.attr("height", height)
		.attr("class", "map")
		.call(drag_map); // disable drag map
} else {
	svg_map = d3.select(".map").append("svg")
		.attr("width", '100%')
		.attr("height", height)
		.attr("class", "map")
}

svg_map.append("svg:title").text("World Heat Map of Axpara Talent Distribution")

var g = svg_map.append("g");
var path = d3.geoPath().projection(projection);


var zoom = d3.zoom().on('zoom', event => {
	g.attr('transform', event.transform)
});
svg_map.call(zoom).on('wheel.zoom', null).on('dblclick.multiple', null);

clickOutOfCircle();

d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
	.then(data => {
		const countries = topojson.feature(data, data.objects.countries);
		_countries = g.selectAll('path')
			.data(countries.features)
			.enter().append('path')
			.attr('class', 'country')
			.attr('fill', '#2F3D57')
			.attr('opacity', 0.3)
			.attr('d', path);

	});

d3.json(`${API_URL}/landing/countries/map`)
	.then(data => {
		let circleData = data;
		//console.log('circleData', circleData)

		let maxCnt = 0;
		const maxRadius = 10;
		const minRadius = 3;

		data.forEach(item => {
			if (item.resumes > maxCnt) {
				maxCnt = item.resumes;
			}
		});

		const a = Math.pow(maxCnt, 1 / maxRadius);

		let elem = g
			.selectAll('circle')
			.data(circleData)
			.enter()
			.append('g')
			.attr('class', 'circle')
			.attr('data-id', function (id, index) {
				return index;
			})
			.append('circle')
			.attr('cx', function (eachCircle) {
				return projection([eachCircle.longitude, eachCircle.latitude])[0];
			})
			.attr('cy', function (eachCircle) {
				return projection([eachCircle.longitude, eachCircle.latitude])[1];
			})
			.attr('r', function (eachCircle) {
				const r = log(a, eachCircle.resumes);
				return r > minRadius ? r : minRadius;
			})
			.attr('fill', '#2C8AFF')
			.style('cursor', 'pointer')
			.style('opacity', '0.5')
			.on("click", clickedMarker)
		;
		recenter();
	});


function recenter() {
	//console.log('recentering')
	try {
		// get a handle to the transform object, and reset it to the
		// zoom identity (resets to zoom out all the way)
		let d3zoom = zoom
		let ztrans = d3zoom.transform
		let t = d3.zoomIdentity
		svg_map.transition().duration(1000).call(ztrans, t)

		// get the object and measurements to determine the virtual
		// "bounding" rectangle around the directional extremes of sites
		// i.e., north (topmost), east (rightmost), etc
		let circles = svg_map.select('g').selectAll('circle')
		let data = circles.data()
		let long = data.map(o => parseFloat(o.longitude))
		let lat = data.map(o => parseFloat(o.latitude))
		let rightmost = d3.max(long)
		let leftmost = d3.min(long)
		let topmost = d3.max(lat)
		let bottommost = d3.min(lat)
		// convert the lat/long to points in the projection
		let lt = projection([leftmost, topmost])
		let rb = projection([rightmost, bottommost])
		// calc the gaps (east - west, south - north) in pixels
		let g = rb[0] - lt[0]
		let gh = rb[1] - lt[1]

		// get the dimensions of the panel in which the map sits
		let w = svg_map.node().parentElement.getBoundingClientRect().width
		let h = svg_map.node().parentElement.getBoundingClientRect().height

		// the goal here is to move the halfway point between leftmost and rightmost
		// on the projection sites to the halfway point of the panel in which the
		// svg element resides, and same for 'y'
		// the scale is the value 90% of the scale factor of either east-west to width
		// or south-north to height, whichever is greater
		let neoScale = 0.9 / Math.max(g / w, gh / h)

		// now recalculate what will be the difference between the current
		// center and the center of the scaled virtual rectangle
		// this finds the difference between the centers
		// the new center of the scaled rectangle is the average of the left and right
		// or top and bottom points
		let neoX = w / 2 - (neoScale * ((lt[0] + rb[0]) / 2))
		let neoY = h / 2 - (neoScale * ((lt[1] + rb[1]) / 2))

		// TRANSLATE FIRST!  then scale.
		t = d3.zoomIdentity.translate(neoX, neoY).scale(neoScale)
		svg_map.transition().duration(1000).call(ztrans, t)
	} catch (e) {
		console.log(e)
	}
}

/**
 * Zoom in by click
 */
d3.select("#zoom_in").on("click", function () {
	zoom.scaleBy(svg_map.transition().duration(750), 1.8);
});

/**
 * Zoom out by click
 */
d3.select("#zoom_out").on("click", function () {
	zoom.scaleBy(svg_map.transition().duration(750), 0.5);
});


/**
 * Add city name over marker
 *
 * @param event
 * @param d
 */
let count = 0;
let oldCountry;

function clickedMarker(event, d) {
	let cx = d3.select(this)._groups[0][0].cx.baseVal.value;
	let cy = d3.select(this)._groups[0][0].cy.baseVal.value;

	d3.selectAll("text").remove()
	d3.selectAll("circle").style('opacity', '0.1')
	d3.select(this).style('opacity', '0.5')
	d3.select(this.parentNode).append('text')
		.attr("dx", cx - 11)
		.attr('dy', cy - 7)
		.text(d.country)
		.style('fill', '#2C8AFF')
		.style('font-size', '10px')

	let countryName = d3.select('text')._groups[0][0].__data__.country;

	if (localStorage.getItem("oldCountry") === null) {
		oldCountry = countryName;
		count = 1;
		localStorage.setItem('oldCountry', oldCountry);
	} else if (localStorage.getItem("oldCountry") !== countryName) {
		oldCountry = d3.select('text')._groups[0][0].__data__.country;
		localStorage.setItem('oldCountry', oldCountry);
		count = 1;
	}

	if (countryName === oldCountry) {
		if (count % 2 === 0) {
			d3.select('text').attr('opacity', '0')
			d3.select(this).style('opacity', '0.1')
		} else {
			d3.select(this).style('opacity', '0.5');
		}
	}
	count++;
}

function log(b, n) {
	return Math.log(n) / Math.log(b);
}

function clickOutOfCircle(){
	svg_map.on('click', function (event){
		if(event.target.tagName !== 'circle'){
			d3.selectAll("text").remove();
			d3.selectAll("circle").style('opacity', '0.5')
			localStorage.removeItem('oldCountry');
		}
	})
}
