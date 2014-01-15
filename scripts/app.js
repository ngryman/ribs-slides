var root = document.getElementById('impress'),
	graphs = {},
	intervalId;

function responsiveDevicesEnter(el) {
	var duration = 6000, steps = 3, step = 1;

	intervalId = setInterval(function() {
		el.querySelector('.animation').setAttribute('data-animation-step', step = ++step > steps ? 1 : step);
	}, duration / steps);
}

function responsiveDevicesLeave() {
	clearInterval(intervalId);
}

function performanceImagesEnter(el) {
	var r = Raphael(el.id);

	var pie = r.piechart(500, 450, 300, [46, 28, 2, 24], {
		stroke: '#EEE',
		strokewidth: 5,
		colors: [
			'#CC3300',
			'#99583D',
			'#CC9114',
			'#CCC'
		]
	});

	var legend = el.querySelectorAll('ul li');
	legend[0].style.left = '50%';
	legend[0].style.top = '5%';
	legend[1].style.left = '85%';
	legend[1].style.top = '75%';
	legend[2].style.left = '15%';
	legend[2].style.top = '75%';
	legend[3].style.left = '3%';
	legend[3].style.top = '47%';

	setTimeout(function() {
		pie[0][0].animate({
			transform: 's1.1 1.1 ' + this.cx + ' ' + this.cy + ' t0 -20'
		}, 1000, 'bounce');
	}, 1000);
}

function imagesTriangleEnter(el) {
//        var r = Raphael(el.id, 900, 900),
//            p;
	<!---->
//        p = r.path('M450,100 l445,600 l-890,0 l445,-600');
//        p.attr('stroke-width', 5);
//        p.attr('stroke-linecap', 'square');
//        p.attr('stroke-linejoin', 'miter');

	var legend = el.querySelectorAll('ul li');
	legend[0].style.left = '51%';
	legend[0].style.top = '3%';
	legend[1].style.left = '96%';
	legend[1].style.top = '85%';
	legend[2].style.left = '5%';
	legend[2].style.top = '85%';

	var canvas = document.createElement('canvas'),
		ctx = canvas.getContext('2d');

	var p1x = 455, p1y = 100,
		p2x = 890, p2y = 700,
		p3x = 10,   p3y = 700;

	canvas.width = 900;
	canvas.height = 900;

	ctx.webkitImageSmoothingEnabled = true;

	var d = 0, incr = 0.005, step = 0;
	intervalId = requestAnimationFrame(function frame() {
		var m = [
			{ x: (p2x - p1x) * d + p1x, y: (p2y - p1y) * d + p1y },
			{ x: (p3x - p2x) * d + p2x, y: (p3y - p2y) * d + p2y },
			{ x: (p1x - p3x) * d + p3x, y: (p1y - p3y) * d + p3y }
		];

		ctx.clearRect(0, 0, 900, 900);

		ctx.fillStyle = 'rgba(204, 51, 0, 1)';
		ctx.lineWidth = 2;

		// moving area
		ctx.beginPath();
		ctx.moveTo(m[0].x, m[0].y);
		ctx.lineTo(m[1].x, m[1].y);
		ctx.lineTo(m[2].x, m[2].y);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();

		// triangle
		ctx.strokeStyle = '#000';
		ctx.lineWidth = 10;
		ctx.beginPath();
		ctx.moveTo(p1x, p1y);
		ctx.lineTo(p2x, p2y);
		ctx.lineTo(p3x, p3y);
		ctx.closePath();
		ctx.stroke();

		d += incr;
		if (d > 1) {
			d = 0;
			step++;
		}

		intervalId = requestAnimationFrame(frame);
	});

	el.appendChild(canvas);
}

function imagesTriangleLeave() {
	cancelAnimationFrame(intervalId);
}

function imagesGoalEnter(el) {
	var graph = new ResolutionGraph(el, [ 320, 768, 1024, 1280 ]);

	graph.click(function(rects, step) {
		switch (step) {
			case 1:
				rects.forEach(function(r) {
					r.animate({ opacity: 1 }, 1000);
				});
				break;

			case 2:
				rects.forEach(function(r) {
					r.animate({ 'fill-opacity': 1 }, 1000);
				});
				break;

			case 3:
				rects[2].animate({ path: 'M768,1152 L1024,1152 L1024,896' }, 1000);
				break;

			case 4:
				rects[3].animate({ opacity: 0 }, 1000);
				rects[4].animate({ path: 'M1024,896 L1024,0 L1920,0' }, 1000);
				break;
		}
	});

	graphs['images'] = graph;
}

function imagesExampleFootprintEnter(el) {
	var graph = graphs['images'],
		footprint = graph.footprint(),
		i = 0,
		el = el.querySelector('strong');

	var intervalId = setInterval(function() {
		el.innerText = ++i;
		if (footprint == i) clearInterval(intervalId);
	}, 30);

}

function ribsPitchEnter(el) {
	var duration = 6000, steps = 3, step = 1;

	intervalId = setInterval(function() {
		el.querySelector('.animation').setAttribute('data-animation-step', step = ++step > steps ? 1 : step);
	}, duration / steps);
}

function ribsPitchLeave() {
	clearInterval(intervalId);
}

function ribsAdvantagesEnter(el) {
	var canvas = document.createElement('canvas'),
		ctx = canvas.getContext('2d');

	var p1x = 455, p1y = 100,
		p2x = 890, p2y = 700,
		p3x = 10,   p3y = 700;

	canvas.width = 900;
	canvas.height = 900;

	ctx.strokeStyle = '#bbb';
	ctx.webkitImageSmoothingEnabled = true;

	// triangle
	ctx.lineWidth = 5;
	ctx.beginPath();
	ctx.moveTo(p1x, p1y);
	ctx.lineTo(p2x, p2y);
	ctx.lineTo(p3x, p3y);
	ctx.closePath();
	ctx.stroke();

	ctx.lineWidth = 2;

	// lines
	ctx.beginPath();
	ctx.moveTo(280, 335);
	ctx.lineTo(620, 335);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(200, 450);
	ctx.lineTo(710, 450);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(110, 565);
	ctx.lineTo(790, 565);
	ctx.stroke();

	el.appendChild(canvas);
}

function ribsAdvantagesPriceEnter(el) {
	var p, ribs, step = 0;

	var r = Raphael(el.id, '100%', '100%');
	r.setViewBox(-20, -20, 1980, 1140);
	r.canvas.setAttribute('preserveAspectRatio', 'none');

//	// boxes
//	p = r.path('M0,0 l980,0 l0,550 l-980,0 l0,-550');
//	p.attr('fill', '#cc3300');
//	p = r.path('M980,0 l980,0 l0,550 l-980,0 l0,-550');
//	p.attr('fill', '#35D281');
//	p = r.path('M980,550 l980,0 l0,550 l-980,0 l0,-550');
//	p.attr('fill', '#cc3300');
//	p = r.path('M0,550 l980,0 l0,550 l-980,0 l0,-550');
//	p.attr('fill', '#35D281');

	// others
	p = r.path('M0,800 l530,0 l0,-400 l710,0 l0,-400 l730,0 l0,1110 L0,1100');
	p.attr('fill', '#eee');
	p.attr('stroke', '#444');
	p.attr('stroke-width', 4);

	// ribs
	ribs = r.path('M0,1100 L1970,0 L1970,1110 L0,1110');
	ribs.attr('fill', '#cc3300');
	ribs.attr('stroke', '#444');
	ribs.attr('stroke-width', 6);
	ribs.attr('opacity', 0);

	// axes
	p = r.path('M45,45 L0,0 l0,1100 l1940,0 l-45,-45');
	p.attr('stroke', '#444');
	p.attr('stroke-width', 15);

	// levels
	r.path('M530,0 l0,1100');
	r.path('M0,800 l1960,0');
	r.path('M1240,0 l0,1100');
	r.path('M0,400 l1960,0');

	el.addEventListener('click', function() {
		step++;

		if (1 == step) {
			ribs.animate({ opacity: 1 }, 1000);
		}
		else {
			ribs.animate({ path: 'M0,1100 L1960,1100 L1960,1100 L0,1100' }, 1000, 'bounce');
		}
	});
}

function fakeEndEnter(el) {
	setTimeout(function() {
		el.querySelector('h2').style.display = 'none';

		document.documentElement.classList.add('dark');

		var space = document.querySelector('#space');
		space.style.display = 'block';

		var hacker = document.querySelector('#hacker');
		hacker.style.display = 'block';
		hacker.offsetWidth;
		hacker.classList.add('active');

		var canvas = space.querySelector('canvas');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		var ctx = canvas.getContext('2d');
		var width = window.innerWidth;
		var height = window.innerHeight;

		ctx.fillStyle = 'rgb(255, 255, 255)';

		// stars
		for (var i = 0; i < 400; i++) {
			var x = Math.random() * width;
			var y = Math.random() * height;
			var r = Math.random() * 2;

			ctx.beginPath();
			ctx.arc(x, y, r, 0, 2 * Math.PI, false);
			ctx.fill();
		}

		var yoda = document.querySelector('#yoda');
		yoda.classList.add('active');

		yoda.addEventListener('webkitAnimationEnd', function() {
			this.style.webkitTransform = 'translate(-100%)';

			var speach = document.createElement('div');
			speach.id = 'speach';
			hacker.appendChild(speach);
			speach.offsetWidth;
			speach.innerHTML = "Hey! I'm <strong>Broda</strong>.<br> Don't you forget something young padawan?";
			speach.classList.add('active');

			setTimeout(function() {
				hacker.removeChild(speach);
				speach = document.createElement('div');
				speach.id = 'speach';
				hacker.appendChild(speach);
				speach.offsetWidth;
				speach.style.textAlign = 'center';
				speach.innerHTML = "The source dude!<br><strong>Use</strong> the <strong>source</strong>!";
				speach.classList.add('active');

				setTimeout(function() {
					hacker.removeChild(speach);
					speach = document.createElement('div');
					speach.id = 'speach';
					hacker.appendChild(speach);
					speach.offsetWidth;
					speach.style.transition = '2s';
					speach.style.textAlign = 'center';
					speach.style.lineHeight = '280%';
					speach.innerHTML = "A long time ago...";
					speach.classList.add('active');

					// activate ships
					space.querySelector('#firefox').classList.add('active');
					space.querySelector('#ie').classList.add('active');

					space.classList.add('active');
					space.addEventListener('transitionend', function(e) {
						if (space !== e.target) return;

						// clean up
						document.body.removeChild(hacker);
						document.body.removeChild(space);

						// next slide
						impress().next();
					});
				}, 5000);
			}, 5000);
		});

		hacker.addEventListener('webkitTransitionEnd', function(e) {
			if (hacker !== e.target || 'opacity' != e.propertyName) return;

			clearInterval(intervalId);
		});

		var iframe = hacker.querySelector('iframe');
		var e = new KeyboardEvent('keydown', { bubbles : true, cancelable : true, key : "Q", char : "Q", shiftKey : false });

		intervalId = setInterval(iframe.contentDocument.dispatchEvent.bind(iframe.contentDocument, e), 10);
	}, 8000);
}

//// DEBUG
function openSourceEnter() {
	document.documentElement.classList.add('dark');
}

function openProjectsEnter(el) {
	!function rotateRandom() {
		var index = Math.ceil(Math.random() * 18);
		var logo = el.querySelector('img:nth-child(' + index + ')');
		logo.style.webkitAnimation = 'rotate 2s';

		intervalId = setTimeout(rotateRandom, Math.random() * 2000 + 1000);
	}();
}

function openProjectsLeave() {
	clearTimeout(intervalId);
}

function callHandler(type, e) {
	// extract id & camelize
	var id = e.target.id.replace(/-(\w)/g, function(match) {
		return match[1].toUpperCase();
	});

	// call appropriate handler if it exists
	var fn = window[id + type[0].toUpperCase() + type.slice(1)];
	if ('undefined' != typeof fn) {
		fn(e.target);
	}
}

root.addEventListener('impress:stepenter', callHandler.bind(null, 'enter'));
root.addEventListener('impress:stepleave', callHandler.bind(null, 'leave'));

/**
 * Devices buttons
 */

var buttons = document.querySelectorAll('.embed button');
for (var i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener('click', function(e) {
		var size = parseInt(e.target.innerText);
		var container = e.target.parentNode.parentNode;
		container.style.width = size + 'px';

		var active = container.querySelector('.is-active');
		if (active) active.classList.remove('is-active');
		e.target.classList.add('is-active');
	});
}