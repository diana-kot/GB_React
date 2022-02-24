import React, { Component } from 'react';
import '../App.css';

class Tab extends Component {

	render() {
		return (
			<div 
				className={`tab ${
					this.props.active ? "tab-active" : ""
				}` }
				onClick={
					this.props.onClick
				}>{this.props.text}</div>
		);
	}
}

export default Tab;