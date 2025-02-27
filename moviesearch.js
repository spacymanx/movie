console.log('bean sprouts')

// My objective is to:
// 1. Use JavaScript to capture user input and send it to my backend (or call the TMDB API directly).
// 2. Make request to TMDB to Search for movies by their original, translated and alternative titles.
// 3. After retrieving a movie’s ID, use the Similar Movies API to get related movies.
// 4. For each of the 10 movies suggested, whip up a chunk of HTML that presents a movie card
// 5. Inject those movie cards into our search_wrap

// I want my page to do certain things AFTER my html has loaded
document.addEventListener('DOMContentLoaded', () => {
  // this function below will only run AFTER my HTML and CSS has been understood by the browser.
});


function handleButtonClick(){
  const searchInput = document.getElementById("movie_search");
  console.log(searchInput.value)

  makeSearchRequest(searchInput.value)

}


search.addEventListener("search", (e) => {
  e.addEventListener("keypress", event => {
    if (event.key === "Enter") {
      makeSearchRequest(searchInput.value)
    }
  });
 
});


async function makeSearchRequest(searchTerm) {
  // this is the function that should make a network request

  // first, lets see what it was handed:
  console.log("makeSearchRequest", searchTerm)

  
  const API_URL_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`;

  try {
      // I am making a GET request to the TMDB URL by using javascripts "fetch" method.
      // fetch makes a GET request by default.
      // I am asigning the result to a variable that I have called 'response'.
      const response = await fetch(API_URL_SEARCH);

      // Lets see what we got
      console.log("HELLO BEAN", response);

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
      const firstFifteen = data.results.slice(0, 15) // Get the top 5 movies
      // Let's see the first 5!
      console.log("HELLO 2", firstFifteen);

      // Now that I have the first five. I want to do MORE than console.log them
      // I want to display them on screen!
      setTimeout(() => {
          displayMovies(firstFifteen, '#search_results');
      },  FORCED_DELAY)

  } catch (error) {
      console.error("Failed to fetch and display popular movies", error)
  }

}
