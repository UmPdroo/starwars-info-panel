const Form = {
	searchTearm: document.querySelector("input#search-bar").value,

	submit(event) {
		event.preventDefault();
		try {
			let url = `https://swapi.dev/api/people/?search=${Form.searchTearm}`;

			let xhttp = new XMLHttpRequest();
			xhttp.open("GET", url, true);

			xhttp.onreadystatechange = function () {
				if (xhttp.readyState == 4 && xhttp.status == 200) {
					let results = JSON.parse(xhttp.responseText);
					searchResults = results.results;
					DOM.updateResultList();
					console.log(url);
				}
			};

			xhttp.send();
			Form.searchTearm = "";
			Form.searchTearm.value = "";
		} catch (error) {
			alert(error.message);
		}
	},
};

let searchResults = [];

const DOM = {
	searchResultsContainer: document.querySelector(".search-results"),

	addResult(result) {
		const li = document.createElement("li");
		li.innerHTML = DOM.innerHTMLsearchResult(result);

		DOM.searchResultsContainer.appendChild(li);
	},

	innerHTMLsearchResult(result) {
		let gender = Utils.translateGender(result.gender);

		// let homeworld = Utils.formatHomeworld(result.homeworld);

		const html = `
		<span id="name">${result.name}</span>
		<span id="birth-year">Nascimento: <strong>${result.birth_year}</strong></span>
		<span id="gender">Genero: <strong>${gender}</strong></span>
		`;
		// <span id="homeworld">Planeta Natal: <strong>${result.homeworld}</strong></span>

		return html;
	},

	updateResultList() {
		DOM.searchResultsContainer.innerHTML = "";

		for (let i = 0; i < searchResults.length; i++) {
			DOM.addResult(searchResults[i]);
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

	/*formatHomeworld(homeworld) {
		let url = homeworld;
		let homeworldName;

		let xhttp = new XMLHttpRequest();
		xhttp.open("GET", url, true);

		xhttp.onreadystatechange = function () {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				let result = JSON.parse(xhttp.responseText);
				let actualHomeworld = result.name;
				console.log(actualHomeworld);
				return actualHomeworld;
			}
		};

		xhttp.send();
	},*/
};
