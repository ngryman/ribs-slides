!function() {
	var root = document.getElementById('impress');

	var heap = {
		keyHandler: null,
		intervalId: null,
		rafId: null,
		els: [],
		iframe: null
	};

	var helpers = {
		keyEnter: function(handler) {
			heap.keyHandler = function(e) {
				if (13 == e.keyCode) handler.call(this, e);
			};

			document.addEventListener('keyup', heap.keyHandler);
		},

		interval: function(fn, duration) {
			heap.intervalId = setInterval(fn, duration);
		},

		raf: function(fn) {
			heap.rafId = requestAnimationFrame(function frame() {
				fn();
				heap.rafId = requestAnimationFrame(frame);
			});
		},

		embed: function(container, url, width, height) {
			var iframe = document.createElement('iframe');
			iframe.src = url;
			if (width) iframe.width = width;
			if (height) iframe.height = height;

			setTimeout(function() {
				container.appendChild(iframe);
				heap.iframe = iframe;
			}, 500);
		},

		garbage: function(el) {
			heap.els.push(el);
		},

		cleanup: function() {
			document.removeEventListener('keyup', heap.keyHandler);
			heap.keyHandler = null;

			clearInterval(heap.intervalId);
			heap.intervalId = null;

			cancelAnimationFrame(heap.rafId);
			heap.rafId = null;

			if (heap.els.length > 0) {
				heap.els.forEach(function(el) {
					el.parentNode.removeChild(el);
				});
				heap.els = [];
			}

			if (heap.iframe) {
				heap.iframe.parentNode.removeChild(heap.iframe);
			}
		}
	};

	function callHandler(type, e) {
		// extract id & camelize
		var id = e.target.id.replace(/-(\w)/g, function(match) {
			return match[1].toUpperCase();
		});

		// cleanup on leave
		if ('leave' == type) helpers.cleanup();

		// call appropriate handler if it exists
		var fn = window[id + type[0].toUpperCase() + type.slice(1)];
		if ('undefined' != typeof fn) {
			fn.call(helpers, e.target);
		}
	}

	root.addEventListener('impress:stepenter', callHandler.bind(null, 'enter'));
	root.addEventListener('impress:stepleave', callHandler.bind(null, 'leave'));
}();