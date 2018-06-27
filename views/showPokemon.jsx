var React = require('react');
var LayoutContainer = require('./layout.jsx');

class Home extends React.Component {
  render() {

  	let formActionEdit = '/' + this.props.id + '/edit?_method=PUT';
  	let formActionDelete = '/' + this.props.id + '/delete?_method=DELETE';


    return (
    	<LayoutContainer>
 			<div className="container">
 				<div className="col-sm pic_container">
		      	<img src ={this.props.img} />
		      	</div>
		      	<div className="col-sm information">
		      	<h1>{this.props.name}</h1>
		      	<ul>
		      	<li>Id : {this.props.id} </li>
		      	<li>Num : {this.props.num} </li>
		      	<li>Weight : {this.props.weight} </li>
		      	<li>Height : {this.props.height} </li>
		      	</ul>
		      	</div>
		      	<div className="col-sm buttons">
		      	<form method="GET" action={formActionEdit}>
		      	<button type="submit">EDIT</button>
		      	</form>
		      	<p></p>
		      	<form method="POST" action={formActionDelete}>
		      	<button type="submit">DELETE</button>
		      	</form>
		      	</div>
	      	</div>
	    </LayoutContainer>
     
    );
  }
}

module.exports = Home;