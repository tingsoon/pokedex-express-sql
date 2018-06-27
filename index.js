const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const configs = {
  user: 'angtingsoon',
  host: '127.0.0.1',
  database: 'pokemons',
  port: 5432,
}

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Routes
 * ===================================
 */



// add new pokemon
app.get('/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('addPokemon');
});

app.post('/new', (request, response) => {

    let input = request.body;
    input.id = parseInt(input.id);
    input.height += ' m';
    input.weight += ' kg';

    const queryString = 'INSERT INTO pokemon (id, num, name, img, weight, height) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';

    let values = [input.id, input.num, input.name, input.img, input.weight, input.height];

    // insert data into postgres
    pool.query(queryString, values, (err, result) => {
      if (err) {
        console.log('query error', err.message);
      } else {
        response.send("Pokemon Added!");
      }
    });

});


// app.post('/pokemon', (req, response) => {
//   let params = req.body;

//   const queryString = 'INSERT INTO pokemon(name, height) VALUES($1, $2)'
//   const values = [params.name, params.height];

//   pool.query(queryString, values, (err, res) => {
//     if (err) {
//       console.log('query error:', err.stack);
//     } else {
//       console.log('query result:', res);

//       // redirect to home page
//       response.redirect('/');
//     }
//   });
// });




// edit pokemon
app.get('/:id/edit', (request, response) => {

  let pokemonIndex = parseInt(request.params.id);

  response.render('editPokemon', {id: pokemonIndex});

});

app.put('/:id/edit', (request, response) => {

  let originalId = parseInt(request.params.id);

  let newValue = request.body;
  newValue.id = parseInt(newValue.id);
  newValue.height += ' m';
  newValue.weight += ' kg'; 

  // update pokemon
  const queryString = 'UPDATE pokemon SET (id = $2, num = $3, name = $4, img = $5, weight = $6, height = $7) WHERE id = $1' ;

  let values = [originalId, newValue.id, newValue.num, newValue.name, newValue.img, newValue.weight, newValue.height];

  pool.query(queryString, values, (err, queryResult) => {

    if (err) {
      response.status(500).send('error: ' + err.message);
    } else {
      response.send("Pokemon Added!");
    }

  });

});


// Delete pokemon
app.delete('/:id/delete', (request, response) => {

  let pokeId = parseInt(request.params.id)

  const queryString = 'DELETE from pokemon WHERE id = $1';

  let values = [pokeId];

  pool.query(queryString, values, (err, queryResult) => {

    if (err) {
      response.status(500).send('error: ' + err.message);
    } else {
      response.send("Pokemon Deleted!");
    }

  });

});


// Sort by name
app.put('/pokemon/sortName', (request, response) => {

  let queryString = 'SELECT * FROM pokemon ORDER BY name ASC';

  pool.query(queryString, (err, queryResult) => {

    if (err) {
      response.status(500).send('error: ' + err.message);
    } else {
      // redirect to home page
      response.redirect('/name');
      console.log("sort button is clicked.")
    }
  });
});

// Sort by id
app.put('/pokemon/sortId', (request, response) => {

  let queryString = 'SELECT * FROM pokemon ORDER BY id ASC';

  pool.query(queryString, (err, queryResult) => {

    if (err) {
      response.status(500).send('error: ' + err.message);
    } else {
      // redirect to home page
      response.redirect('/');
      console.log("sort button is clicked.")
    } 
  });
});

// display all pokemon by id
app.get('/', (req, response) => {
  // query database for all pokemon

  // respond with HTML page displaying all pokemon

  let queryString = 'SELECT * FROM pokemon';

  // gather data from postgres
  pool.query(queryString, (err, result) => {

    let pokeData = result.rows;

    if (err) {
      console.error('query error:', err.stack);
    } else {

      const data = {
        all_pokemon: pokeData
      };

      // redirect to home page
      response.render('Home', data);
    }
  });

});

// display all pokemon by name
app.get('/name', (req, response) => {
  // query database for all pokemon

  // respond with HTML page displaying all pokemon

  let queryString = 'SELECT * FROM pokemon ORDER BY name ASC';

  // gather data from postgres
  pool.query(queryString, (err, result) => {

    let pokeData = result.rows;

    if (err) {
      console.error('query error:', err.stack);
    } else {

      const data = {
        all_pokemon: pokeData
      };

      // redirect to home page
      response.render('Home', data);
    }
  });

});




/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
