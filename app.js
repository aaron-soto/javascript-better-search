let searchInput = document.getElementById('search-input');
let clearIcon = document.getElementById('clear-icon');
let searchWrapper = document.getElementById('search-wrapper');
let resultsList = document.getElementById('results-list');

searchInput.addEventListener('keyup', function (e) {
	let value = e.target.value;

	if (value.length > 0) {
		// clear previous results
		resultsList.innerHTML = '';

		clearIcon.classList.add('searching');
		let filtered = data.filter((item) => {
			return item.name.includes(value);
		});

		const uniqueTypes = [...new Set(filtered.map((obj) => obj.type))];
		console.log(uniqueTypes);

		if (filtered.length > 0) {
			searchWrapper.classList.add('hasResults');
			uniqueTypes.forEach((type, idx) => {
				let headingWrapper = document.createElement('div');
				headingWrapper.classList.add('headingWrapper');
				let heading = document.createElement('h4');
				heading.appendChild(document.createTextNode(type));
				headingWrapper.appendChild(heading);
				let typeCount = document.createElement('div');
				typeCount.classList.add('typeCount');
				typeCount.appendChild(
					document.createTextNode(
						filtered.filter((obj) => obj.type === type).length
					)
				);
				headingWrapper.appendChild(typeCount);
				resultsList.appendChild(headingWrapper);

				filtered.forEach((item) => {
					let li = document.createElement('li');
					if (item.type === type) {
						let strings = item.name.split(value);
						strings.forEach((str, idx) => {
							li.appendChild(document.createTextNode(str));
							if (idx < strings.length - 1) {
								let span = document.createElement('span');
								span.appendChild(document.createTextNode(value));
								li.appendChild(span);
							}
						});

						resultsList.appendChild(li);
					}
				});
				if (idx < uniqueTypes.length - 1) {
					resultsList.appendChild(document.createElement('hr'));
				}
			});
		}

		console.log(filtered);
	} else {
		clearIcon.classList.remove('searching');
		searchWrapper.classList.remove('hasResults');
	}
});

clearIcon.addEventListener('click', () => {
	searchInput.value = '';
	resultsList.innerHTML = '';
	clearIcon.classList.remove('searching');
	searchWrapper.classList.remove('hasResults');
});
