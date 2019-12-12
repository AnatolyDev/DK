import { SIGNIN, SIGNOUT } from '../constants';

const authReducer = (state = {user: undefined}, action) => {
    switch (action.type) {
        case SIGNIN:
            return {user : action.payload};
        
        case SIGNOUT:
            return {user : undefined};

        default:
            return state;
    }
}

export default authReducer;