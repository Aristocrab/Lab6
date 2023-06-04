const key = "cd933dac02f7a301292358f4dd09c308";
const baseUrl = "https://api.themoviedb.org/3/";

async function Search(event) {
    event.preventDefault();
    let movieInfo = document.querySelector(".movieInfo");

    let query = document.querySelector("#movieName").value;
    if(query == "") {
        movieInfo.innerHTML = "";
        return;
    }

    let movie = await SearchMovieByName(query);
    if(movie == null) {
        alert("Фільм не знайдено");
        movieInfo.innerHTML = "";
        return;
    }

    let genres = await GetGenresByIds(movie.genre_ids);
    let genresHtml = "";
    for(let i = 0; i < genres.length; i++) {
        genresHtml += `<span class="genre">${genres[i]}</span> `;
    }


    movieInfo.innerHTML = `
    <div class="movieInfo">
        <div class="moviePoster">
            <img src="${'https://image.tmdb.org/t/p/w500/' + movie.poster_path}" alt="${movie.title} poster">
        </div>
        <div class="movieDescription">
            <h2>${movie.title} ${genresHtml}</h2>
            <p><span class="detail">Опис</span> ${movie.overview}</p>
            <p><span class="detail">Дата виходу</span> ${movie.release_date}</p>
            <p><span class="detail">Середня оцінка</span> ${movie.vote_average} (${movie.vote_count})</p>
        </div>
    </div>
    `;
    
}

async function SearchMovieByName(query) {
    const url = baseUrl + "search/movie?query=" + encodeURI(query) + "&include_adult=false&language=uk-UA&page=1&api_key=" + key;
    let response = await fetch(url);
    let json = await response.json();

    if(json.results.length == 0) {
        return null;
    }
    
    let result = json.results[0];

    return result;
}

async function GetGenresByIds(ids) {
    const url = baseUrl + "genre/movie/list?language=uk-UA&api_key=" + key;
    let response = await fetch(url);
    let json = await response.json();

    let result = [];

    for(let i = 0; i < ids.length; i++) {
        for(let j = 0; j < json.genres.length; j++) {
            if(ids[i] == json.genres[j].id) {
                result.push(json.genres[j].name);
            }
        }
    }

    return result;
}

document.querySelector(".searchForm").addEventListener("submit", function(event){
    event.preventDefault();
    Search(event);
});