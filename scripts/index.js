let url = "https://swapi.dev/api/films/";

let xhttp = new XMLHttpRequest();
xhttp.open("GET", url, true);

xhttp.onreadystatechange = function () {
	if (xhttp.readyState == 4 && xhttp.status == 200) {
		Movies = JSON.parse(xhttp.responseText);
        App.init();
	}
};

xhttp.send();

let Movies = [];

const DOM = {
	movieTableContainer: document.querySelector(".movieList"),
	addMovie(movie, i) {
		const tr = document.createElement("tr");
		tr.innerHTML = DOM.innerHTMLMovie(movie, i);

		DOM.movieTableContainer.appendChild(tr);
	},
	innerHTMLMovie(movie, i) {
        let title = Utils.formatTitle(i)
        let release_date = Utils.formatYear(i)

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
        let title = Movies.results[i].title
        let ep = Movies.results[i].episode_id
        
        return `Episodio ${ep} - ${title}`
    },
	formatYear(i) {
        let date = Movies.results[i].release_date
        let splittedYear = date.split("-")

        return splittedYear[0]
    },
};

const App = {
	verifyInitialization() {
		while (Movies.results == undefined) {
			App.verifyInitialization();
		}
	},
	init() {
		for (let i = 0; i < 6; i++) {
			DOM.addMovie(Movies.results[i], i);
		}
	},
};
