const API_KEY = '518921a89f081c44e23db36c349730e4'; // Replace with your TMDB API key
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// My objective is to:
// 1. Make request to TMDB to get Popular Movies
// 2. Once we have the data, just use the first 5.
// 3. For each of the 5, whip up a chunk of HTML that presents a movie card
// 4. Inject those movie cards into our movie_scroller

// I want my page to run my fetchMovies function AS SOON as my website loads.
document.addEventListener('DOMContentLoaded', () => {
    // this function below will only run AFTER my HTML and CSS has been understood by the browser.
    // if fetch movies was ran earlier.. there's a risk that it could obtain the popular movies data
    // and try to inject them into the 'movie_scroller', but .. the movie_scroller might not exist yet.
    fetchMovies();
});

// I am writing function here that fetches movies.
async function fetchMovies() {
    try {
        // I am making a GET request to the TMDB URL by using javascripts "fetch" method.
        // fetch makes a GET request by default.
        // I am asigning the result to a variable that I have called 'response'.
        const response = await fetch(API_URL);

        // Lets see what we got
        console.log("HELLO", response);

        // I need to inspect the repsonse and obtain the JSON data from it.
        // I do that by called the json() method on the response object.
        // I am assigning the json data to a variable that I have called 'data'.
        const data = await response.json();

        // Let's see the data!
        console.log("HELLO 1", data);

        // Wow. This API returns an object with 4 properties. One of them is called results
        // Results is an array that contains ~20 objects.
        // Because I am only interested in the first 5, I need to obtain them.


        // I know that "results" is an ARRAY of 20 things.
        // Javascript has some methods/ways of working with arrays.
        // I could use one of those methods to manipulate my array.
        // The "slice" method lets my split an array at a specific spot until a specific spot.
        // Eg, starting at item 0, I want to split this array at item 5.
        const firstFive = data.results.slice(0, 5) // Get the top 5 movies
        // Let's see the first 5!
        console.log("HELLO 2", firstFive);

        // Now that I have the first five. I want to do MORE than console.log them
        // I want to display them on screen!
        setTimeout(() => {
            displayMovies(firstFive);
        }, 1250)

    } catch (error) {
        console.error("Failed to fetch and display popular movies", error)
    }
}

// I've written a function called "displayMovies"
// It's job is to take an array of movies that are provided to it
// And to prepare some HTML that will then be injected into my movie_scroller.
function displayMovies(movies) {
    // We know that "movies" is going to be an array.

    // I am first finding the place in my HTML where I want my movies to be injected into.
    // I am using the browsers querySelector method, which lets my find HTML elements by class or by ID.
    const movieContainer = document.querySelector('.movie_scroller');
    // Let's see what I found!
    console.log("HELLO 3", movieContainer)

    // Once I have my movieContainer, I want to clear its content.
    // I can do that by setting its innerHTML to an empty string.
    movieContainer.innerHTML = ''; // Clear existing content

    // I know that "movies" is an array of 5 movie objects.
    // Something like this:
    // [
    //  { title: "meow", img: "blah.jpg" },
    //  { title: "cow", img: "blah.jpg" },
    //  { title: "chow", img: "blah.jpg" },
    //  { title: "trowel", img: "blah.jpg" },
    //  { title: "fowel", img: "blah.jpg" },
    // ]

    // I want to do something for each movie.
    // I want to prepare a chunk of HTML and inject it into my 
    // movie_scroller div.

    // So I will use the "forEach" method which is available on arrays
    // And this will give me a chance to do something for each individual item.

    movies.forEach(movie => {
        // this code will run for every item of my array.
        // and I can access the properties of the current item being inspected
        // by refering to the variable name (nickname) that i gave it of "movie"
        console.log("HELLO 4", movie.title);

        
    })

    movies.forEach(movie => {
        // lets use javascript to create a brand new DIV.
        const movieCard = document.createElement('div');
        // lets use javascript to put a class name on that brand new DIV
        movieCard.classList.add('cardstyle_movie');
        // Lets see whats it made so far
        console.log("HELLO 5", movieCard)

        // Right now, my movie card looks like this:
        // <div class="cardstyle_movie"></div>
        // A bit empty.

        // I need to fill my movie card with content. Specifically, an img and a title and release date.
        // I do that by setting the innerHTML to the content i need.
        movieCard.innerHTML = `
            <div class="movie_img">
                <img class="poster_img" src="${IMAGE_BASE_URL}${movie.poster_path}" alt="${movie.title}">
            </div>
            <div class="contents">
                <h2>${movie.title}</h2>
                <p>${new Date(movie.release_date).toDateString()}</p>
            </div>
        `;

        // Once I've prepared the html for this movie card
        // I am adding to the movieContainer (my movie_scroller);
        movieContainer.appendChild(movieCard);
    });
}