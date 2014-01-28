!function() {
	'use strict';

	var WIDTH = 1920;

	function ResolutionGraph(el, resolutions, helpers) {
		// add final resolution
		resolutions.push(1920);

		var r = Raphael(el.id, '100%', '100%');
		r.setViewBox(-20, -20, 1960, 1960);
		r.canvas.setAttribute('preserveAspectRatio', 'none');
		helpers.garbage(r.canvas);

		// legend list
		var legendList = document.createElement('ul');

		// straight line
		var line = r.path('M0,1920 L1920,0');
		line.attr('stroke', '#444');
		line.attr('stroke-width', 15);

		var rects = [];

		// draw a rectangle and the legends for each resolution
		resolutions.forEach(function(resolution, i) {
			var x1 = resolutions[i - 1] ? resolutions[i - 1] : 0,
				y1 = WIDTH - x1,
				x2 = resolution,
				y2 = WIDTH - resolution;

			// rectangle
			rects[i] = r.path('M' + x1 + ',' + y1 + ' L' + x1 + ',' + y2 + ' L' + x2 + ',' + y2);
			rects[i].attr('fill', '#CC3300');
			rects[i].attr('fill-opacity', 0);
			rects[i].attr('opacity', 0);
			rects[i].attr('stroke-width', 5);

			// legend
			var legend = document.createElement('li');
			legend.style.left = (resolution / WIDTH * 1000) + 'px';
			legend.style.top = '105%';
			legend.innerText = resolution;
			legendList.appendChild(legend);
		});

		// draw breakpoints over
		resolutions.forEach(function(resolution, i) {
			if (i < resolutions.length - 1) {
				r.path('M' + resolution + ',0 l0,1920');
				r.path('M0,' + (WIDTH - resolution) + ' l1920,0');
			}
		});

		// add legend list to DOM
		el.appendChild(legendList);
		helpers.garbage(legendList);

		// assign properties
		this.el = el;
		this.helpers = helpers;
		this.resolutions = resolutions;
		this.line = line;
		this.rects = rects;
		this.step = 0;
	}

	ResolutionGraph.prototype.key = function(fn) {
		this.helpers.keyEnter(function(e) {
			fn(this.rects, ++this.step);
		}.bind(this));
	};

	ResolutionGraph.prototype.footprint = function() {
		var E = 2.718281828,
			area = 0,
			resolutions = this.resolutions;

		resolutions.forEach(function(resolution, i) {
			var prev = resolutions[i - 1] ? resolutions[i - 1] : 0,
				size = resolution - prev;

			area += size * size;
		});

		// http://en.wikipedia.org/wiki/Exponential_distribution
		var footprint = area / (WIDTH * WIDTH);
		footprint = Math.ceil((1 - Math.pow(E, -5 * footprint)) * 100);

		return footprint;
	};

	window.ResolutionGraph = ResolutionGraph;

}();