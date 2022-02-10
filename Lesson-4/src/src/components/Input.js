import React, { Component } from 'react';
import '../css/profile.css';

class Input extends Component {

	render() {
		return (
			<div className={`input ${this.props.className}`}
				><span>{this.props.children}</span><input type="text"
					   value={this.props.text}
					   onChange={(e) => {
					   	this.props.onChange(
					   		this.props.name, e)
					   } } /></div>
		);
	}
}

export default Input;