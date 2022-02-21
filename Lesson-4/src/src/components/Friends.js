import React, { Component } from 'react';
import '../App.css';
import Friend from './Friend';
import ScrollArea from 'react-scrollbar/dist/no-css';

import '../css/friends.css';

let scrollStyle = {
	borderRadius: 3,
	backgroundColor: '#0f7bb1'
};

class Friends extends Component {
	
	isOnline() {
		let number = Math.ceil(Math.random() * 10);
		return number % 2 === 0? true : false;
	}

	render() {
		return (
			<div className={
					this.props.display? 'visible' : 'hidden'
			}><ScrollArea
					speed={0.8}
					className='area'
					horizontal={false} 
					vertical={true}
					verticalScrollbarStyle={scrollStyle}
				>
					<div className='friends'>
						{this.props.friends['friends'].map( (item, i) => {
							return <Friend name={item['name']} 
										   city={item['city']} 
										   src={item['src']}
										   key={`friend${i}`} 
										   online={this.isOnline()} />
						}) }
					</div>
				</ScrollArea>
			</div>
		);
	}
}

export default Friends;