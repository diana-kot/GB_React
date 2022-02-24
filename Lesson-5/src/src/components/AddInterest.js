import React, { Component } from 'react';
import '../css/profile.css';

class AddInterest extends Component {

	constructor(props) {
		super(props);

		this.state = {
			value : ''
		}
	}

	render() {
		return (
			<div className="profile__interest-add_block clearfix">
				<input value={this.state.value}
					   onChange={e => {
					   	this.setState({ 
					   		value : e.target.value.toLowerCase() });
					   }} />
				<div onClick={() => {
						this.props.onConfirm(this.state.value);
						this.setState({ value : '' });
					 }}
					 className="profile__interest-add_btn">
					Добавить
				</div>
			</div>
		);
	}
}

export default AddInterest;