fetch(`https://swapi.dev/api/films/`).then((response) => {
	response.json().then((data) => {
		(Movies = data.results), App.init();
	});
});

let Movies = [];

const DOM = {
	movieTableContainer: document.querySelector(".movieList"),
	addMovie(movie, i) {
		const tr = document.createElement("tr");
		tr.innerHTML = DOM.innerHTMLMovie(movie, i);

		DOM.movieTableContainer.appendChild(tr);
	},
	innerHTMLMovie(movie, i) {
		let title = Utils.formatTitle(i);
		let release_date = Utils.formatYear(i);

		const html = `
        <td>${title}</td>
        <td>${release_date}</td>
        <td>${movie.director}</td>
        `;

		return html;
	},
};

const Utils = {
	formatTitle(i) {
		let title = Movies[i].title;
		let ep = Movies[i].episode_id;

		return `Episodio ${ep} - ${title}`;
	},
	formatYear(i) {
		let date = Movies[i].release_date;
		let splittedYear = date.split("-");

		return splittedYear[0];
	},
};

const App = {
	init() {
		for (let i = 0; i < Movies.length; i++) {
			DOM.addMovie(Movies[i], i);
		}
	},
};
