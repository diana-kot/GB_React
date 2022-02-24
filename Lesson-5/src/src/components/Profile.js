import React, { Component } from 'react';
import '../css/profile.css';

import Input from './Input';
import Button from './Button';
import AddInterest from './AddInterest';

let profile;

if (localStorage.getItem('profile')) {
	profile = JSON.parse(localStorage.getItem('profile'));
} else {
	profile = require('../data/profile');
	let serialObj = JSON.stringify(profile);
	localStorage.setItem('profile', serialObj);
}


class Profile extends Component {

	constructor(props) {
		super(props);

		this.state = {
			'name' : profile.name,
			'city' : profile.city,
			'src' : profile.src,
			'marriage' : profile.info.marriage,
			'phone' : profile.info.phone,
			'email' : profile.info.email,
			'interests' : profile.interests
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.addInterest = this.addInterest.bind(this);
	}

	saveData() {
		let serialObj = JSON.stringify(profile);
		localStorage.setItem('profile', serialObj);
	}

	loadImage() {
		let image = require(`!file-loader!../img/${this.state.src}`);
		return image;
	}

	handleChange(prop, event) {		
		let value = event.target.value;
		if (profile[prop]) {
			profile[prop] = value;
		} else if (profile.info[prop]) {
			profile.info[prop] = value;
		};		
		this.saveData();
		this.setState({ [prop] : value });
	}

	handleClick(i) {
		let arr = this.state['interests'].map( el => el);
		arr.splice(i, 1);
		profile['interests'].splice(i, 1);
		this.saveData();
		this.setState({ 'interests' : arr });
	}

	addInterest(interest) {
		let arr = this.state['interests'].map( el => el);
		for (let i = 0; i < arr.length; i++) {
			if (interest === arr[i] || interest === '' || interest === ' ') {
				return false;
			}
		}
		arr.unshift(interest);
		profile['interests'].unshift(interest);
		this.saveData();
		this.setState({ 'interests' : arr });
	}

	render() {
		return (
			<div className={
				this.props.display? 'visible' : 'hidden'
			}>
				<div className='profile'>				
					<div className="profile__avatar">
						<div className="profile__img">
							<img src={this.loadImage()} alt="Фото профиля" />
							<div className="profile_img-shadow"></div>
						</div>
						<button className="profile__btn">Добавить в друзья</button>
					</div>
					<div className="profile__info">
						<Input text={this.state.name} 
								  onChange={this.handleChange}
								  name='name'
								  className='profile__name' />
						<Input text={this.state.city}
								  onChange={this.handleChange}
								  name='city'
								  className='profile__city'>{`г. `}</Input>
						<div className="profile__titles">
							<span className="profile__title">Семейное положение</span>
							<span className="profile__title">Телефон</span>
							<span className="profile__title">E-mail</span>						
						</div>
						<div className="profile__inputs">
							<Input text={this.state.marriage}
										  onChange={this.handleChange} 
										  name='marriage'
										  className='profile__marriage' />
							<Input text={this.state.phone}
										  onChange={this.handleChange}
										  name='phone'
										  className='profile__phone' />
							<Input text={this.state.email}
										  onChange={this.handleChange}
										  name='email'
										  className='profile__email' />
						</div>
						<div className="profile__interests">
							<span className="profile__interests_header">Интересы</span>
							<div className="profile__interests_btns">{
								this.state['interests'].map( (item, i) => {
									return <Button className="profile__interest"
													  key={`interest${i}`}
													  order={i}
													  text={this.state['interests'][i]}
													  onClick={this.handleClick} />;												
								})
							}</div>
						</div>
					</div>				
				</div>
				<div className='profile__interest-add'>
					<span>Добавить интерес</span>
					<AddInterest onConfirm={this.addInterest} />
				</div>
			</div>
		);
	}
}

export default Profile;