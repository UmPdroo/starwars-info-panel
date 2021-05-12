let loading = document.querySelector(".loading");
const Form = {
	searchTearm: "",
	searchType: "",

	submit(event) {
		this.searchTearm = document.querySelector("input#search-bar").value;
		event.preventDefault();
		try {
			loading.classList.add("on");
			fetch(
				`https://swapi.dev/api/${this.searchType}/?search=${this.searchTearm}`
			).then((response) => {
				response.json().then((data) => {
					searchResults = data.results;

					if (this.searchType === "people") {
						for (let i = 0; i < searchResults.length; i++) {
							fetch(searchResults[i].homeworld).then(
								(response) => {
									response.json().then((data) => {
										searchResults[i].homeworld = data.name;
										DOM.updateResultList(this.searchType);
									});
								}
							);
						}
					} else {
						DOM.updateResultList(this.searchType);
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

	addResult(result, type) {
		const li = document.createElement("li");
		li.innerHTML = DOM.innerHTMLsearchResult(result, type);

		DOM.searchResultsContainer.appendChild(li);
	},
	addKnowMore(result) {
		const li = document.createElement("li");
		li.innerHTML = DOM.innerHTMLknowMore(result);

		DOM.searchResultsContainer.appendChild(li);
	},

	innerHTMLsearchResult(result, type) {
		if (type === "people") {
			let gender = Utils.translateGender(result.gender);

			const html = `
			<span id="name">${result.name}</span>
			<span id="birth-year">Nascimento: <strong>${result.birth_year}</strong></span>
			<span id="gender">Genero: <strong>${gender}</strong></span>
			<span id="homeworld">Planeta Natal: <strong>${result.homeworld}</strong></span>
			`;

			return html;
		} else if (type === "starships") {
			let gender = Utils.translateGender(result.gender);

			const html = `
			<span id="name">${result.name}</span>
			<span id="model">Modelo: <strong>${result.model}</strong></span>
			<span id="manufactory">Fabricante: <strong>${result.manufacturer}</strong></span>
			<span id="credits">Custo em creditos: <strong>${result.cost_in_credits}</strong></span>
			`;

			return html;
		}
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

	updateResultList(type) {
		loading.classList.remove("on");
		Form.searchTearm.value = "";
		Form.searchTearm = "";
		DOM.searchResultsContainer.innerHTML = "";

		for (let i = 0; i < searchResults.length; i++) {
			DOM.addResult(searchResults[i], type);
		}
	},
	updateKnowMoreList() {
		loading.classList.remove("on");
		console.log(searchResults);

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
	setSearchType(type) {
		Form.searchType = type;
		switch (type) {
			case "people":
				document.querySelector(
					"input#search-bar"
				).placeholder = `Pesquisando por personagens`;
				break;

			case "starships":
				document.querySelector(
					"input#search-bar"
				).placeholder = `Pesquisando por naves`;
				break;

			case "planets":
				document.querySelector(
					"input#search-bar"
				).placeholder = `Pesquisando por planetas e luas`;
				break;

			default:
				break;
		}
	},
};

const App = {
	init() {
		App.knowMore();
		Utils.setSearchType("people");
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
		}, 2000);
		console.log(randomSearch);
	},
};

App.init();
