import React, { Component } from 'react';
import './App.css';
import friends from './data/friends';

import Tab from './components/Tab';
import Profile from './components/Profile';
import Friends from './components/Friends';

class App extends Component {

  constructor() {
    super();

    this.state = {
      tab : 'profile'
    }
  }

  handleClick(tab) {
    if (tab === 'profile') {
      this.setState({
        tab : 'profile'
      });
    } else {
      this.setState({
        tab : 'friends'
      });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="tabs">
          <Tab text="Профиль" 
               onClick={ () => { 
                this.handleClick('profile'); 
               } }
               active={ 
                this.state.tab === 'profile' ? true : false } />
          <Tab text="Друзья пользователя" 
               onClick={ () => { 
                this.handleClick('friends'); 
               } }
               active={ 
                this.state.tab === 'profile' ? false : true } /> 
        </div>
        <div className="container">
          <Profile display={
            this.state.tab === 'profile' ? true : false
          } />
          <Friends friends={friends} display={
            this.state.tab === 'profile' ? false : true
          } />
        </div>
      </div>
    );
  }
}

export default App;
