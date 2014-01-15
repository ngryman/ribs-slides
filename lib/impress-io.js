!function() {
	var root = document.getElementById('impress');

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
}();