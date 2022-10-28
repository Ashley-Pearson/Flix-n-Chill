var movieKey = '34a134b6f5c8f05caaa647f4e9e2c70e';
// API: Trending movies
var movieUrl = 'https://api.themoviedb.org/3/trending/movie/day?api_key=' + movieKey;
var movie = $(".random-movie");
var coctail = $(".random-cocktail");

// Get random movie
function randomMovie() {
    fetch(movieUrl)
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {
            var rndmMovie = data.results;
            var rndmMovieTitleIndex = Math.floor(Math.random() * rndmMovie.length);
            var rndmMovieTitle = rndmMovie[rndmMovieTitleIndex].title;

            console.log(rndmMovie[rndmMovieTitleIndex]);
            $('#movieTitle').append("<strong>" + rndmMovieTitle);
            $('#movieYear').append(rndmMovie[rndmMovieTitleIndex].release_date);
            $('#movieOverview').append(rndmMovie[rndmMovieTitleIndex].overview);

            movieGenre(rndmMovie[rndmMovieTitleIndex].genre_ids);           
        })
        .catch(function () {
            // catch any errors
        });
}
randomMovie();


function movieGenre(genreId) {
    console.log(genreId)
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
                        console.log(genres[k].name);
                        strGenres += ","+ genres[k].name;
                    }
                }
            }
            $('#movieGenre').append(strGenres.slice(1));
        })
        .catch(function () {
            // catch any errors
        });
}

// Get random Cocktail with intructions using API random cocktail
var drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

function drinkData() {

    fetch(drinkUrl)
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {
            var strDrinks = data.drinks[0];

            $('#drinkName').append("<strong> " + strDrinks.strDrink);

            //Loop through 15 ingredients
            for (var i = 1; i <= 15; i++) {

                if ((strDrinks["strIngredient" + i] !== null) && (strDrinks["strMeasure" + i] !== null)) {
                    $('#drinkRecipe').append("<li>" + strDrinks["strIngredient" + i] + " " + strDrinks["strMeasure" + i]);
                }
            }
            //Instructions
            $('#drinkRecipe').append('<br>Instructions:<br><p class="indent">' + strDrinks.strInstructions);
        })
        .catch(function () {
            // catch any errors
        });
}
drinkData();