import React, { Component } from 'react';
import '../css/profile.css';

class Button extends Component {

	render() {
		return (
			<span className={this.props.className}
				  onClick={() => {
				  	this.props.onClick(this.props.order);
				  }}>{
				this.props.text
			}</span>
		);
	}
}

export default Button;