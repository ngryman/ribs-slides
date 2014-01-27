!function() {
	var root = document.getElementById('impress'),
		placeholder = document.getElementById('sources');

	root.addEventListener('impress:stepenter', function(e) {
		var sources = e.target.querySelector('.sources');
		if (!sources) return;

		placeholder.innerHTML = sources.innerHTML;
		placeholder.classList.add('active');
	});

	root.addEventListener('impress:stepleave', function() {
		placeholder.classList.remove('active');
	});
}();