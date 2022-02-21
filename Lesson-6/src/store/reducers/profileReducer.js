import defaultState from '../initialState'
import TOGGLE_ONLINE_PROFILE from '../actions/action_online_profile'

const profileReducer = (state = defaultState, action) => {
    switch (action.type) {
      case TOGGLE_ONLINE_PROFILE:
        return {...state, profile: action.payload }
      default: 
        return state
    }
}

export {profileReducer}