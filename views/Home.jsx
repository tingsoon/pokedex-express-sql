var React = require('react');
var LayoutContainer = require('./layout.jsx');

class Home extends React.Component {
  render() {

  	const imgStyle = {
  		backgroundColor: '#F2F2F2',
  		'text-align': 'center'
  	}

  	const titleStyle = {
  		'textAlign': 'center',
  		margin: '30px',
  	}

  	const nameStyle = {
  		'font-weight': 'bold',
  	}

  	const idStyle = {
  		color: '#9E9E9E',
  	}

  	let message = <h1>Welcome to Ting Soon's Pokédex!!</h1>;

  	const allPokemonData = this.props.all_pokemon.map( function(pokemon) {
  		return (
  			
  			<div className="col-3">
	  			<div className="image" style={imgStyle}>
	  				<img src={pokemon.img} />
	  			</div>
	  			<div className="text">
	  				<p style={nameStyle}>{pokemon.name}</p>
	  				<p style={idStyle}>#{pokemon.id}</p>
	  				<p>Num : {pokemon.num}</p>
	  				<p>Height : {pokemon.height}</p>
	  				<p>Weight : {pokemon.weight}</p>
	  			</div>
  			</div>
  			
  		)

  	});

    return (
    	<LayoutContainer>
	      <div style={titleStyle}>
	      	{message}
	      	<p></p>
	      	<div>
    			<form className="sortform" method="POST" action="/pokemon/sortName?_method=PUT">
                    <input type="hidden" name="sortbyName" />
                    <div className="buttonDiv">
                        <input className="sortNameButton" type="submit" value="Sort Pokémon By Name" />
                    </div>
                </form>
	      	</div>
	      	<p></p>
	      	<div>
    			<form className="sortform" method="POST" action="/pokemon/sortId?_method=PUT">
                    <input type="hidden" name="sortbyId" />
                    <div className="buttonDiv">
                        <input className="sortNameButton" type="submit" value="Sort Pokémon By Id" />
                    </div>
                </form>
	      	</div>
	      	<p></p>
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