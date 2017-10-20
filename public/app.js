var app = function () {
  console.log("app being called")
  makeRequest();
}

var makeRequest = function (){
  url = "https://pokeapi.co/api/v2/pokemon/?limit=151"

  var request = new XMLHttpRequest();
  request.open("GET", url)
  request.send();
  request.addEventListener('load', function(){
    var pokemons = JSON.parse(this.responseText);
    console.log(pokemons);
  })

  request.open("GET", url);
  request.send();
  request.addEventListener('load', function(){
    var beers = JSON.parse(this.responseText)
    console.log(beers)
    render(beers);
  });
}

window.addEventListener("load", app);
