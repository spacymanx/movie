console.log('beans');





//////////////////////////////////////////////////////////
const API_KEY = '518921a89f081c44e23db36c349730e4'; // Replace with your TMDB API key
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

document.addEventListener('DOMContentLoaded', () => {
    fetchMovies();
});

async function fetchMovies() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        displayMovies(data.results.slice(0, 5)); // Get the top 5 movies
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
}

function displayMovies(movies) {
    const movieContainer = document.querySelector('.movie_scroller');
    movieContainer.innerHTML = ''; // Clear existing content

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('cardstyle_movie');

        movieCard.innerHTML = `
            <div class="movie_img">
                <img class="poster_img" src="${IMAGE_BASE_URL}${movie.poster_path}" alt="${movie.title}">
            </div>
            <div class="contents">
                <h2>${movie.title}</h2>
                <p>${new Date(movie.release_date).toDateString()}</p>
            </div>
        `;

        movieContainer.appendChild(movieCard);
    });
}
