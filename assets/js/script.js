var movieKey = '34a134b6f5c8f05caaa647f4e9e2c70e';

var divMovie = $("#random-movie");
var cocktailCard = $("#random-cocktail");
// API: Trending movies
var movieUrl = 'https://api.themoviedb.org/3/trending/movie/day?api_key=' + movieKey;

// Get random movie
function randomMovie(url) {
    fetch(url)
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {
            var rndmMovie = data.results;         
            var rndmMovieTitleIndex = Math.floor(Math.random() * rndmMovie.length);
            var rndmMovieTitle = rndmMovie[rndmMovieTitleIndex].title;

            divMovie.empty();
            divMovie.append("<p>Title: <strong>" + rndmMovieTitle);
            divMovie.append("<p>Release Date: " + rndmMovie[rndmMovieTitleIndex].release_date);
            movieGenre(rndmMovie[rndmMovieTitleIndex].genre_ids);
            divMovie.append("<p>Overview: " + rndmMovie[rndmMovieTitleIndex].overview);            
        })
        .catch(function () {
            // catch any errors
        });
}
// window.onload = randomMovie(movieUrl);

function movieGenre(genreId) {

    var movieGenreURL = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + movieKey + "&language=en-US";
    fetch(movieGenreURL)
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {
            var genres = data.genres;
            var strGenres = "";
            for (var i = 0; i < genreId.length; i++) {
                for (var k = 0; k < genres.length; k++) {
                    if (genres[k].id == genreId[i]) {
                        strGenres += ", " + genres[k].name;
                    }
                }
            }
            divMovie.append("<p>Genre: " + strGenres.slice(1));
        })
        .catch(function () {
            // catch any errors
        });
}

$("#genre-submit").on('click', function () {
    var selectedGenre = $("#genre-selector option:selected").val();
    // API: Discovery movies
    var movieByGenreUrl = "https://api.themoviedb.org/3/discover/movie?api_key=" + movieKey + "&language=en-US&sort_by=popularity.desc&with_genres=" + selectedGenre+"&with_watch_monetization_types=flatrate&include_adult=false&include_video=false&page=1";
    randomMovie(movieByGenreUrl);
});


// Get random Cocktail with intructions using API random cocktail
var drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

function drinkData(srtDrinkUrl) {

    fetch(srtDrinkUrl)
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {
            cocktailCard.empty();
            var strDrinks = data.drinks[0];

            cocktailCard.append("<p>Name: <strong> " + strDrinks.strDrink);
cocktailCard.append("<p>Recipe: ");
            //Loop through 15 ingredients
            for (var i = 1; i <= 15; i++) {

                if ((strDrinks["strIngredient" + i] !== null) && (strDrinks["strMeasure" + i] !== null)) {
                    cocktailCard.append("<li>" + strDrinks["strIngredient" + i] + " " + strDrinks["strMeasure" + i]);
                }
            }
            //Instructions
            cocktailCard.append('<br>Instructions:<br><p class="indent">' + strDrinks.strInstructions);
        })
        .catch(function () {
            // catch any errors
        });
}
// drinkData(drinkUrl);
//get array of drinks with user's selected ingredient and select a random drink id from the array
function drinkBy() {
    var userIngredient = $("#cocktail-selector option:selected").text();
    console.log(userIngredient);
    var drinkByUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + (userIngredient)
    fetch(drinkByUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            var rndmDrink = data.drinks;
            var rndmDrinkSelected = Math.floor(Math.random() * rndmDrink.length);
            var rndmDrinkId = rndmDrink[rndmDrinkSelected].idDrink;
            drinkById(rndmDrinkId);
            return
        })
};
//get drink recipe by searching drink id
function drinkById(rndmDrinkId) {
    var drinkByIdUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + (rndmDrinkId)
    fetch(drinkByIdUrl)
        .then(function (response) {
            return response.json()
        })
            drinkData(drinkByIdUrl);
};

$("#submit-cocktail").on("click", drinkBy)