var React = require('react');
var LayoutContainer = require('./layout.jsx');

class Home extends React.Component {
  render() {

  	let message = <h1>Welcome to Ting Soon's Pokedex!!</h1>;

  	const allPokemonData = this.props.all_pokemon.map( function(pokemon) {
  		return (
  			
  			<div className="col-3">
	  			<div className="image">
	  				<img src={pokemon.img} />
	  			</div>
	  			<div className="text">
	  				<p>{pokemon.name}</p>
	  				<p>{pokemon.id}</p>
	  				<p>Num : {pokemon.num}</p>
	  				<p>Height : {pokemon.height}</p>
	  				<p>Weight : {pokemon.weight}</p>
	  			</div>
  			</div>
  			
  		)

  	});

    return (
    	<LayoutContainer>
	      <div>
	      	{message}
	      	<div>
    			<form className="sortform" method="POST" action="/pokemon/sortName?_method=PUT">
                    <input type="hidden" name="sortbyName" />
                    <div className="buttonDiv">
                        <input className="sortNameButton" type="submit" value="Sort Pokemons By Name" />
                    </div>
                </form>
	      	</div>
	      	<div>
    			<form className="sortform" method="POST" action="/pokemon/sortId?_method=PUT">
                    <input type="hidden" name="sortbyId" />
                    <div className="buttonDiv">
                        <input className="sortNameButton" type="submit" value="Sort Pokemons By Id" />
                    </div>
                </form>
	      	</div>
	      	<div className="container">
  			<div className="row">
	        	{allPokemonData}
	        </div>
  			</div>
	      </div>
	     </LayoutContainer>
    );
  }
}

module.exports = Home;