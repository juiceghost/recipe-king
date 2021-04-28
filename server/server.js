var express = require('express'),
    path = require('path'),
    app = express(),
    bodyParser = require('body-parser');

var userName = 'Krille';
console.log("userName is equal to " + userName)
//set the port
app.set('port', 5000);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//tell express that we want to use the public folder
//for our static assets
app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'))
/* app.get('/', (req, res) => {
    // https://www.digitalocean.com/community/tutorials/nodejs-serving-static-files-in-express
    res.send('Hello World!');
}); */

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
