import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import 'flexboxgrid/dist/flexboxgrid.min.css';
import { red600 } from 'material-ui/styles/colors';

const App = (props) => {
	console.log(red600);
	return (
		<div>
			<div id="topBar" className="row">
				<AppBar title="Rubiks Central" showMenuIconButton={false} style={{backgroundColor: red600}}/>
			</div>
			<div id="bodyContainer">
				{props.children}
			</div>
		</div>
	);
};

App.propTypes = {
	children: PropTypes.element
};

export default App;