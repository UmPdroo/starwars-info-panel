const Form = {
	searchTearm: "",

	submit(event) {
		Form.searchTearm = document.querySelector("input#search-bar").value;
		event.preventDefault();
		try {
			fetch(
				`https://swapi.dev/api/people/?search=${Form.searchTearm}`
			).then((response) => {
				response.json().then((data) => {
					searchResults = data.results;

					for (let i = 0; i < searchResults.length; i++) {
						fetch(searchResults[i].homeworld).then((response) => {
							response.json().then((data) => {
								searchResults[i].homeworld = data.name;
								DOM.updateResultList();
							});
						});
					}
				});
			});
		} catch (error) {
			alert(error.message);
		}
	},
};

let searchResults = [];

const DOM = {
	searchResultsContainer: document.querySelector(".search-results"),

	addResult(result, inner) {
		const li = document.createElement("li");
		li.innerHTML = DOM.innerHTMLsearchResult(result);

		DOM.searchResultsContainer.appendChild(li);
	},
	addKnowMore(result, inner) {
		const li = document.createElement("li");
		li.innerHTML = DOM.innerHTMLknowMore(result);

		DOM.searchResultsContainer.appendChild(li);
	},

	innerHTMLsearchResult(result) {
		let gender = Utils.translateGender(result.gender);

		const html = `
		<span id="name">${result.name}</span>
		<span id="birth-year">Nascimento: <strong>${result.birth_year}</strong></span>
		<span id="gender">Genero: <strong>${gender}</strong></span>
		<span id="homeworld">Planeta Natal: <strong>${result.homeworld}</strong></span>
		`;

		return html;
	},
	innerHTMLknowMore(result) {
		let gender = Utils.translateGender(result.gender);
		let birth_year = Utils.formatBirth(result.birth_year);
		let homeworld = Utils.formatHomeworld(result.homeworld);

		const html = `
		<span id="name">${result.name}</span>
		<span id="birth-year">Nascimento: <strong>${birth_year}</strong></span>
		<span id="gender">Genero: <strong>${gender}</strong></span>
		<span id="homeworld">Planeta Natal: <strong>${homeworld}</strong></span>
		`;

		return html;
	},

	updateResultList() {

		Form.searchTearm.value = "";
		Form.searchTearm = "";
		DOM.searchResultsContainer.innerHTML = "";

		for (let i = 0; i < searchResults.length; i++) {
			DOM.addResult(searchResults[i]);
		}
	},
	updateKnowMoreList() {
		console.log(searchResults);

		for (let i = 0; i < searchResults.length; i++) {
			fetch(searchResults[i].homeworld).then((response) => {
				response.json().then((data) => {
					searchResults[i].homeworld = data.name;
				});
			});
		}
		DOM.searchResultsContainer.innerHTML = "";

		for (let i = 0; i < searchResults.length; i++) {
			DOM.addKnowMore(searchResults[i]);
		}
	},
};

const Utils = {
	translateGender(gender) {
		if (gender == "male") {
			return "Masculino";
		} else {
			return "Feminino";
		}
	},
	formatBirth(birth) {
		if (birth == "unknown") {
			return "N/A";
		} else {
			return birth;
		}
	},
	formatHomeworld(homeworld) {
		if (homeworld.includes("http://swapi.dev/api/") == true) {
			return "Não especificado";
		} else {
			return homeworld;
		}
	},
	limitSearchResults() {
		while (searchResults.length > 6) {
			searchResults.pop();
		}
	},
};

const App = {
	init() {
		App.knowMore();
	},
	knowMore() {
		searchResults = [];
		let randomSearch = [];
		for (let i = 0; i < 3; i++) {
			randomSearch.push(Math.floor(Math.random() * (82 - 1) + 1));
		}

		for (let i = 0; i < randomSearch.length; i++) {
			fetch(`https://swapi.dev/api/people/${randomSearch[i]}`).then(
				(response) => {
					response.json().then((data) => {
						searchResults.push(data);
					});
				}
			);
		}

		setTimeout(() => {
			DOM.updateKnowMoreList();
		}, 1000);
		console.log(randomSearch);
	},
};

App.init();
