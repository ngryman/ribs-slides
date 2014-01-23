!function(exports) {
	var graphs = {},
		intervalId;

	exports.responsiveEnter = function(el) {
		el.addEventListener('click', function() {
			el.classList.add('images');
		});
	}

	exports.responsiveDevicesEnter = function(el) {
		var duration = 6000, steps = 3, step = 1;

		intervalId = setInterval(function() {
			el.querySelector('.animation').setAttribute('data-animation-step', step = ++step > steps ? 1 : step);
		}, duration / steps);
	}

	exports.responsiveDevicesLeave = function() {
		clearInterval(intervalId);
	}

	exports.imagesComparisonHnicEnter = function(el) {
		setTimeout(function() {
			var t = el.querySelector('template');
			var container = t.parentNode;
			var clone = document.importNode(t.content, true);
			container.appendChild(clone);
		}, 500);
	}

	exports.imagesComparisonAmcEnter = function(el) {
		setTimeout(function() {
			var t = el.querySelector('template');
			var container = t.parentNode;
			var clone = document.importNode(t.content, true);
			container.appendChild(clone);
		}, 500);
	}

	exports.imagesComparisonPurpleEnter = function(el) {
		setTimeout(function() {
			var t = el.querySelector('template');
			var container = t.parentNode;
			var clone = document.importNode(t.content, true);
			container.appendChild(clone);
		}, 500);
	}

	exports.performanceImagesEnter = function(el) {
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

	exports.imagesTriangleEnter = function(el) {
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

	exports.imagesTriangleLeave = function() {
		cancelAnimationFrame(intervalId);
	}

	exports.imagesGoalEnter = function(el) {
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

	exports.imagesExampleFootprintEnter = function(el) {
		var graph = graphs['images'],
			footprint = graph.footprint(),
			i = 0,
			el = el.querySelector('strong');

		var intervalId = setInterval(function() {
			el.innerText = ++i;
			if (footprint == i) clearInterval(intervalId);
		}, 30);

	}

	exports.ribsPitchEnter = function(el) {
		var duration = 6000, steps = 3, step = 1;

		intervalId = setInterval(function() {
			el.querySelector('.animation').setAttribute('data-animation-step', step = ++step > steps ? 1 : step);
		}, duration / steps);
	}

	exports.ribsPitchLeave = function() {
		clearInterval(intervalId);
	}

	exports.ribsAdvantagesEnter = function(el) {
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

	exports.ribsAdvantagesPriceImagesEnter = function(el) {
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
				ribs.animate({ path: 'M0,1100 L1970,1000 L1970,1110 L0,1110' }, 1000);
			}
		});
	}

	exports.ribsAdvantagesPriceTrafficEnter = function(el) {
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
				ribs.animate({ path: 'M0,1100 L1970,1110 L1970,1110 L0,1110' }, 1000, 'bounce');
			}
		});
	}

	exports.ribsFirstEndEnter = function(el) {
		setTimeout(function() {
			var t = el.querySelector('template');
			var container = t.parentNode;
			var clone = document.importNode(t.content, true);
			container.appendChild(clone);
		}, 500);
	};

	exports.fakeEndEnter = function(el) {
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
					speach.innerHTML = "The source bro!<br><strong>Use</strong> the <strong>source</strong>!";
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

	exports.newAdvantagesCommunicationEnter = function(el) {
		/// DEBUG
		document.documentElement.classList.add('dark');

		setTimeout(Speach.create.bind(null, el), 2000);
		document.addEventListener('keyup', keyHandler);

		function keyHandler(e) {
			if (107 == e.keyCode) {
				Speach.create(el);
			}
			else if (109 == e.keyCode) {
				Speach.remove();
			}
		}

		Speach.keyHandler = keyHandler;
	};

	exports.newAdvantagesProductEnter = function(el) {
		//// DEBUG
		document.documentElement.classList.add('dark');

		el.addEventListener('click', function() {
			el.querySelector('img').classList.add('active');
		});
	};

	exports.newAdvantagesStrategyEnter = function(el) {
		//// DEBUG
		document.documentElement.classList.add('dark');
	};

	exports.newAdvantagesCommunicationLeave = function() {
		document.removeEventListener('keyup', Speach.keyHandler);
		Speach.cleanup();
	};

	exports.openProjectsEnter = function(el) {
		!function rotateRandom() {
			var index = Math.ceil(Math.random() * 18);
			var logo = el.querySelector('img:nth-child(' + index + ')');
			logo.style.webkitAnimation = 'rotate 2s';

			intervalId = setTimeout(rotateRandom, Math.random() * 2000 + 1000);
		}();
	}

	exports.openProjectsLeave = function() {
		clearTimeout(intervalId);
	}

	exports.githubCommunitiesEnter = function(el) {
		!function rotateRandom() {
			var index1 = Math.ceil(Math.random() * 5);
			var index2 = Math.ceil(Math.random() * 6);
			var logo = el.querySelector('.community:nth-child(' + index1 + ') img:nth-child(' + index2 + ')');
			logo.style.webkitAnimation = 'wriggle 10s';

			intervalId = setTimeout(rotateRandom, Math.random() * 1000);
		}();
	}

	exports.githubCommunitiesLeave = function() {
		clearTimeout(intervalId);
	}

	exports.newAdvantagesProduct = function() {
		var settings = {
			NUM_PARTICLES : 80,
			DISTANCE_T    : 100,
			RADIUS        : 5,
			OPACITY       : 0.5,
			SPEED_X       : 3,
			SPEED_Y       : 0.5,
			AMPLITUDE     : 10
		};

		var COLOURS    = ["#3FB8AF", "#FF3D7F", "#EBE54D"],
			bounds     = {},
			particles  = [],
			random     = Math.random,
			sqrt       = Math.sqrt,
			PI         = Math.PI,
			ctx, W, H, stats;

		function Particle() {
			this.x      = random() * bounds.right;
			this.y      = random() * bounds.bottom;
			this.xspeed = random() * settings.SPEED_X;
			this.yspeed = random() * settings.SPEED_Y;
			this.radius = settings.RADIUS;
			this.colour = COLOURS[ ~~(random() * COLOURS.length)];
		}

		var bindEvents = function() {
			window.addEventListener('resize', resize, false);
		};

		var resize = function() {
			W = window.innerWidth;
			H = window.innerHeight;
			ctx.canvas.width  = W;
			ctx.canvas.height = H;
			bounds.top      = 100;
			bounds.right    = W - 100;
			bounds.bottom   = H - 100;
			bounds.left     = 100;
		};

		var draw = function() {
			render();
			requestAnimFrame(draw);
		};

		var update = function (p) {
			p.x += p.xspeed;
			p.y += p.yspeed;

			if (p.x > bounds.right) {
				p.x = bounds.right;
				p.xspeed *= -1;
			}
			if (p.x < bounds.left) {
				p.x = bounds.left;
				p.xspeed *= -1;
			}
			if (p.y > bounds.bottom) {
				p.y = bounds.bottom;
				p.yspeed *= -1;
			}
			if (p.y < bounds.top) {
				p.y = bounds.top;
				p.yspeed *= -1;
			}
		};

		var render = function() {
			ctx.beginPath();
			ctx.globalCompositeOperation = "source-over";
			ctx.rect(0, 0 , W, H);
			ctx.fillStyle = "#111111";
			ctx.fill();
			ctx.closePath();

			ctx.globalCompositeOperation = "lighter";

			for (var i = 0; i < particles.length; i += 1) {
				var p = particles[i];

				ctx.beginPath();
				ctx.globalAlpha = settings.OPACITY;
				ctx.fillStyle = p.colour;
				ctx.arc(p.x, p.y, p.radius, PI * 2, false);
				ctx.fill();
				ctx.closePath();

				for (var j = 0; j < particles.length; j += 1) {
					var pp = particles[j],
						yd = pp.y - p.y,
						xd = pp.x - p.x,
						d  = sqrt(xd * xd + yd * yd);

					if ( d < settings.DISTANCE_T ) {
						ctx.beginPath();
						ctx.globalAlpha = (settings.DISTANCE_T - d) / (settings.DISTANCE_T - 0);
						ctx.lineWidth = 1;
						ctx.moveTo(p.x, p.y);

						if ( settings.AMPLITUDE ) {
							ctx.bezierCurveTo(
								p.x,
								p.y - random() * settings.AMPLITUDE,
								pp.x,
								pp.y + random() * settings.AMPLITUDE,
								pp.x,
								pp.y
							);
						} else {
							ctx.lineTo(pp.x, pp.y);
						}

						ctx.strokeStyle = p.colour;
						ctx.lineCap = "round";
						ctx.stroke();
						ctx.closePath();

					}
				}

				update(p);

			}
		};

		var updateSpeed = function( x, y, attr ) {
			var speed = arguments[0] ? x : y;
			for (var i = 0; i < settings.NUM_PARTICLES; i += 1) {
				var ns = random() * speed;
				particles[i][attr] = particles[i][attr] > 0 ? ns : -ns;
			}
		};

		var updateRadius = function( value ) {
			for (var i = 0; i < settings.NUM_PARTICLES; i += 1) {
				particles[i].radius = value;
			}
		};

		var init = function() {
			ctx = document.getElementsByTagName('canvas')[0].getContext('2d');

			bindEvents();
			resize();

			for (var i = 0; i < settings.NUM_PARTICLES; i += 1) {
				particles.push( new Particle() );
			}

			draw();
		};
	}

	exports.openSourceRisksDescEnter = function() {
		//// DEBUG
		document.documentElement.classList.add('dark');
	};

	exports.ribsFinishEnter = function(el) {
		//// DEBUG
		document.documentElement.classList.add('dark');

		setTimeout(function() {
			var t = el.querySelector('template');
			var container = t.parentNode;
			var clone = document.importNode(t.content, true);
			container.appendChild(clone);
		}, 500);
	};

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


	/**
	 * Speach class
	 */

	function Speach(container) {
		var glifs = ["&#xe600", "&#xe601"];
		var speachEl = document.createElement('div');
		speachEl.classList.add('speach');
		speachEl.innerHTML = glifs[Math.floor(Math.random() * 2)];

		container.appendChild(speachEl);

		this.el = speachEl;
		this.pos = {
			x: 0,
			y: 0
		};
	}

	Speach.prototype.run = function() {
		this.getPos();

		this.el.style.left = 50 + (this.pos.x * 190) + (1 == this.pos.y % 2 ? 95 : 0) + 'px';
		this.el.style.top = 40 + this.pos.y * 200 + 'px';
		this.el.classList.add('active');

		this.timeoutId = setTimeout(this.run.bind(this), Math.random() * 4000 + 1000);
	};

	Speach.prototype.getPos = function() {
		var x = Math.ceil(Math.random() * 5);
		var y = Math.floor(Math.random() * 4);

		if (Speach.rnds[x + '@' + y]) {
			this.getPos();
		}
		else {
			Speach.rnds[this.pos.x + '@' + this.pos.y] = false;
			this.pos.x = x;
			this.pos.y = y;
			Speach.rnds[x + '@' + y] = true;
		}
	};

	Speach.prototype.destroy = function() {
		clearTimeout(this.timeoutId);
		Speach.rnds[this.pos.x + '@' + this.pos.y] = false;
		this.el.parentNode.removeChild(this.el);
	};

	Speach.create = function(container) {
		var s = new Speach(container);
		s.run();
		Speach.speaches.push(s);
	};

	Speach.cleanup = function() {
		while (Speach.speaches.length > 0) {
			var s = Speach.speaches.shift();
			if (s) s.destroy();
		}
		console.log(Speach.rnds);
	};

	Speach.remove = function() {
		var s = Speach.speaches.shift();
		if (s) s.destroy();
	}

	Speach.rnds = {};
	Speach.speaches = [];
}(window);