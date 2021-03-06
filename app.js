const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();
const handlebars = require('hbs')

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
handlebars.registerPartials(path.join(__dirname, "views", "partials"))
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('home-page');
});

app.get('/beers', (req, res) => {
  const getBeer = punkAPI.getBeers()
  getBeer.then(beersFromApi => res.render('beers', {beers: beersFromApi}))
  .catch(error => console.log(error))
})

app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromApi => res.render('random-beer', {randomBeer: responseFromApi}))
  .catch(error => console.log(error))
})

app.get('/beers/:id', (req, res) => {
  punkAPI
  .getBeer(req.params.id)
  .then(data => res.render('beerDetails', {clickedBeer: data}))
  .catch(error => console.log(error))
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
