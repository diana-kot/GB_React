import { CHANGE_NAME } from "./action";

const initialState = {
    name: "Diana",
    age: 28
}

const profileReducer = (state = initialState, action) => {
    switch(action.type){
        case CHANGE_NAME:{
            return{
                ...state,
                name: action.payload.name,
            }
        }
        default:
            return state
        
    }
}

export default profileReducer