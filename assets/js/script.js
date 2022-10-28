var movieKey = '34a134b6f5c8f05caaa647f4e9e2c70e';
// API: Trending movies
var movieUrl = 'https://api.themoviedb.org/3/trending/movie/day?api_key=' + movieKey;
console.log(movieUrl);
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
            var rndmMovieTitle = rndmMovie[Math.floor(Math.random() * rndmMovie.length)].title;
            console.log(rndmMovie);
            $('#movieTitle').append(rndmMovieTitle);
            for (var i=0; i<rndmMovie.length; i++){
                if (rndmMovie[i].title == rndmMovieTitle) {
                    $('#movieYear').append(rndmMovie[i].release_date);
                    $('#movieOverview').append(rndmMovie[i].overview);
                    $('#movieGenre').append(rndmMovie[i].genre_ids);
                }
            }
        })
        .catch(function () {
            // catch any errors
        });
}
randomMovie();

// Get random Cocktail with intructions
// API: Random cocktail
var drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
console.log(drinkUrl);

function drinkData() {

    fetch(drinkUrl)
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {
            //var drink = JSON.stringify(data);
            console.log(data);
            console.log(data.drinks[0].strDrink);
            $('#drinkName').append(data.drinks[0].strDrink);
            for(var i=1; i<=15; i++){
            }
            $('#drinkName').append(data.drinks[0].strDrink);
        })
        .catch(function () {
            // catch any errors
        });
}
drinkData();