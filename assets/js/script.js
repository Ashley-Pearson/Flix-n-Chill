var key = '34a134b6f5c8f05caaa647f4e9e2c70e';
//var url = 'https://api.themoviedb.org/3/trending/movie/day?api_key=' +key;
var url ='https://api.themoviedb.org/3/genre/movie/list?api_key=' + key;
//https://api.themoviedb.org/3/genre/movie/list?api_key=34a134b6f5c8f05caaa647f4e9e2c70e&language=en-US
console.log(url);

function movieData() {
    
    fetch(url)  
    .then(function(resp) {
        return resp.json() 
    })
    .then(function(data) {
        console.log('--->'+(JSON.stringify(data)));
    })
    .catch(function() {
        // catch any errors
    });
}
movieData();

