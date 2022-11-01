var movieKey = '34a134b6f5c8f05caaa647f4e9e2c70e';

var divMovie = $("#random-movie");
var cocktailCard = $("#random-cocktail");
// API: Trending movies
var movieUrl = 'https://api.themoviedb.org/3/trending/movie/day?api_key=' + movieKey;

window.onload = function () {
    $('.card').hide();
    $('#prevSearch').hide();
    if (localStorage.length > 0) {
        getLocalStorageData();
    };
};

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

// Get movie by genre
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
    $('.cardMovie').show();
    var selectedGenre = $("#genre-selector option:selected").val();
    if (selectedGenre == "surprise") {
        randomMovie(movieUrl);
    } else {
        // API: Discovery movies
        var movieByGenreUrl = "https://api.themoviedb.org/3/discover/movie?api_key=" + movieKey + "&language=en-US&sort_by=popularity.desc&with_genres=" + selectedGenre + "&with_watch_monetization_types=flatrate&include_adult=false&include_video=false&page=1";
        randomMovie(movieByGenreUrl);
    }
});

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

            var dataFlixNChill = localStorage.getItem("flixnchill");
            dataFlixNChill = JSON.parse(dataFlixNChill);

            if ((dataFlixNChill == null) || (dataFlixNChill.some(code => code.name === strDrinks.strDrink) == false)){
                addToLocalStorage(strDrinks.strDrink);
            }
            getLocalStorageData();
        })
        .catch(function () {
            // catch any errors
        });
}

//get array of drinks with user's selected ingredient and select a random drink id from the array
function drinkBy() {
    var userIngredient = $("#cocktail-selector option:selected").text();
    var drinkByUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + (userIngredient)
    fetch(drinkByUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
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

// Search Cocktail button clicks
$("#submit-cocktail").on("click", function () {
    $('.cardCocktail').show();
    
    var selectedCocktail = $("#cocktail-selector option:selected").val();
    if (selectedCocktail == "surprise") {
        // Get random Cocktail with intructions using API random cocktail
        var drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
        drinkData(drinkUrl);
    } else {
        drinkBy();
    }
});

// Display previously search results
$(document).on('click', '#txtPrevSearch', function () {

    var drinkName = $(this).val();
    var drinkUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkName;
    drinkData(drinkUrl);

    $('.cardCocktail').show();
    $('#prevSearch').show();
})

//Clear localStorage
$(document).on('click', '#clearSearch', function () {
    localStorage.clear();
    drinks = [];
    $('#prevSearch').empty();
    $('#prevSearch').hide();
    $('.cardCocktail').hide();
})

var drinks = [];
// Store search in localStorage
function addToLocalStorage(text) {
    var id = drinks.length;
    var drinkToStore = {
        id: id,
        name: text
    };
    drinks.push(drinkToStore);
    localStorage.setItem("flixnchill", JSON.stringify(drinks));
}

// Get previously search results
function getLocalStorageData() {
    $('#prevSearch').empty();
    $('#prevSearch').show();

    var dataFlixNChill = localStorage.getItem("flixnchill");
    dataFlixNChill = JSON.parse(dataFlixNChill);

    if (dataFlixNChill) {
        drinks = dataFlixNChill;
        $('#prevSearch').append('<input type="button" class="rounded w-100 mb-2 btn-danger .clearBth" id="clearSearch" value="Clear Search">');
        $('#prevSearch').append('<hr><label>Previously Chosen Cocktail');

        for (var x = 0; x < dataFlixNChill.length; x++) {
            $('#prevSearch').append('<input type="button" id="txtPrevSearch" class="rounded w-100 mb-2" value="' + dataFlixNChill[x].name + '">');
        }
    }
}
