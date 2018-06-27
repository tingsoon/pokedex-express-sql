var React = require('react');
var LayoutContainer = require('./layout.jsx');

class Home extends React.Component {
  render() {
    return (
    	<LayoutContainer>
	      <div className= "container">
			 <h1>Add Pokemon</h1>
				<form method="POST" action="/new" >
				  <p>Pokemon Id: </p>
				  <input type="number" name="id" min="152"/>
				  
				  <p>Pokemon Number: </p>
				  <input type="text" name="num"/>
				  
				  <p>Pokemon Name: </p>
				  <input type="text" name="name"/>
				  
				  <p>Pokemon Weight: </p>
				  <input type="text" name="weight"/> kg
				  
				  <p>Pokemon Height: </p>
				  <input type="text" name="height"/> m
				  <p></p>
				  <input type="submit" value="Submit"/>
				</form>
	      </div>
      </LayoutContainer>
    );
  }
}

module.exports = Home;