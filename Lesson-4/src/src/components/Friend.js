import React, { Component } from 'react';
import '../App.css';
import '../css/friends.css';

class Friend extends Component {

	loadImage() {
		let image = require(`!file-loader!../img/${this.props.src}`);
		return image;
	}

	render() {
		return (
			<div className="friend">
				<div className="friend__avatar">
					<img src={this.loadImage()} alt="Фото не найдено" />
				</div>
				<div className="friend__brief">
					<a href="#" className="friend__name">{
						this.props.name
					}</a>
					<span className="friend__city">г. {
						this.props.city
					}</span>
					<span className="friend__online">{
						this.props.online? "Online" : ""
					}</span>
				</div>
			</div>
		);
	}
}

export default Friend;