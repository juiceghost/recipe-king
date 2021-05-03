var express = require('express'),
    path = require('path'),
    app = express(),
    bodyParser = require('body-parser'),
    axios = require('axios'),
    cachedRR = require('./cachedRandomRecipes'),
    cachedRI = require ('./cachedRecipeInfo'),
    cors = require('cors');

const URLS = {
    'randomRecipes': 'https://api.spoonacular.com/recipes/random',
    'recipeInfo': (id) => (`https://api.spoonacular.com/recipes/${id}/information`)
}
const API_KEY = "526eba0616874a9db294da2d1502ca37";
const numberOfHits = 10; // Obs denna ska ni INTE använda

const useCache = true; // Set this to false to make requests from spoonacular, otherwise use cache

var userName = 'Krille';
//console.log("userName is equal to " + userName)
//set the port
app.set('port', 5000);
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//tell express that we want to use the public folder
//for our static assets
app.use(express.static(path.join(__dirname, 'public')));
//console.log(path.join(__dirname, 'public'))
/* app.get('/', (req, res) => {
    // https://www.digitalocean.com/community/tutorials/nodejs-serving-static-files-in-express
    res.send('Hello World!');
}); */

const getRandomRecipes = () => {
    try {
      return axios.get(`${URLS.randomRecipes}?number=${numberOfHits}&apiKey=${API_KEY}`)
    } catch (error) {
      console.error(error)
    }
  }

const getRecipeInfo = (id) => {
  try {
    return axios.get(`${URLS.recipeInfo(id)}?apiKey=${API_KEY}`)
  } catch (error) {
    console.error(error)
  }
}

app.get(`/recipe/:id`, (req, res) => {
    // gör ett axios-anrop till spoonacular
    // ta datan och skicka tillbaka som res till vår klient
    //console.log(req.params)
    // REACT (anropar) NODE (anropar) SPOON (svarar) NODE (svarar) REACT
    !useCache ? getRecipeInfo(req.params.id).then(response => res.send(response.data)) : res.send(cachedRI)
    
})

app.get('/randomRecipes', (req, res) => {
    // gör ett axios-anrop till spoonacular
    // ta datan och skicka tillbaka som res till vår klient

    // REACT (anropar) NODE (anropar) SPOON (svarar) NODE (svarar) REACT

    // ER UPPGIFT: Denna endpoint anropas av klienten med en query param.
    // Denna query param styr antalet recept som spoonacular skickar 
    // Ta reda på och implementera en fix som gör att detta värde skickas vidare
    // på det sättet som spoonacular förväntar sig
    // Vänligen se https://stackabuse.com/get-query-strings-and-parameters-in-express-js/
    // obs att det är OK att modifiera getRandomRecipes-funktionen. ALla sätt är bra

    !useCache ? getRandomRecipes().then(response => res.send(response.data)) : res.send(cachedRR)
    
})
app.get('/hello', (req, res) => {
    // https://www.digitalocean.com/community/tutorials/nodejs-serving-static-files-in-express
    
    // { message: 'Goodbye!'}
    console.log("inside app.get: userName is equal to " + userName)
    res.send({ message: 'Goodbye ' + userName + "!"});
});
app.post('/hello', (req, res) => {
    // https://www.digitalocean.com/community/tutorials/nodejs-serving-static-files-in-express
    console.log(req.body.user)
    userName = req.body.user;
    res.send({ message: `Goodbye Mr. ${req.body.user || 'Post'}`});
});

// Listen for requests
var server = app.listen(app.get('port'), function () {
    console.log('The server is running on http://localhost:' + app.get('port'));
});


//console.log('I AM ALIVE!')

// https://code.tutsplus.com/tutorials/code-your-first-api-with-nodejs-and-express-understanding-rest-apis--cms-31697
