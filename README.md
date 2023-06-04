# Lab6

## 1. Опис сценарію використання API зовнішнього застосування
Як зовнішній сервіс було обрано API [The Movie Database (TMDB)](https://developer.themoviedb.org/reference/intro/getting-started)

Для автентифікації він потребує API-key, який видається при реєстрації.

### Запит для пошуку фільмів (search/movie) [Повна документація пошуку фільма](https://developer.themoviedb.org/reference/search-movie)

**URL:**
`https://api.themoviedb.org/3/search/movie`

**Метод запиту:**
GET

**Параметри запиту:**
- `query` (обов'язковий): Рядок, який визначає пошук фільмів за оригінальним, перекладеним або альтернативними назвами.
- `include_adult`: Булеве значення, що вказує, чи включати фільми, які мають контент для дорослих.
- `language`: Рядок, який визначає мову, на якій будуть повертатися результати.
- `page`: Ціле число, яке визначає номер сторінки результатів пошуку.

**Приклад запиту:**
`https://api.themoviedb.org/3/search/movie?query=Django&include_adult=false&language=en-US&page=1`

### Відповідь
```json
{
  "page": 1,
  "results": [
    {
      "adult": false,
      "backdrop_path": "/ndyPYfC9pku11YsCDEKsLJY1M1r.jpg",
      "genre_ids": [18, 36, 37],
      "id": 271110,
      "original_language": "en",
      "original_title": "Django Unchained",
      "overview": "With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.",
      "popularity": 42.824,
      "poster_path": "/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
      "release_date": "2012-12-25",
      "title": "Django Unchained",
      "video": false,
      "vote_average": 8.2,
      "vote_count": 22176
    }
  ],
  "total_pages": 1

,
  "total_results": 1
}
```

## 2. Опис прикладу застосування API

Приклад виклику API з функції JS
```js
async function SearchMovieByName(query) {
    // Формується URL 
    const url = baseUrl + "search/movie?query=" + encodeURI(query) + "&include_adult=false&language=uk-UA&page=1&api_key=" + key;
    // Отримується response в форматі JSON 
    let response = await fetch(url);
    let json = await response.json();

    // Якщо фільм не знайдено, повертається null
    if(json.results.length == 0) {
        return null;
    }
    
    // Інакше повертається фільм з найбільшим співпадінням по назві
    let result = json.results[0];

    return result;
}
```
Фрагмент використання цієї функції і даних, що вона повертає
```js
async function Search(event) {
    ...
    let query = document.querySelector("#movieName").value;
    let movie = await SearchMovieByName(query);
    ...
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
```

Приклад на сайті
![](https://i.imgur.com/nejrUIQ.png)
