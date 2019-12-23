import { SIGNIN, SIGNOUT } from '../constants';

export function setUser(user) {
    return {
        type: SIGNIN,
        payload: user
    };
}

export function resetUser() {
    return {
        type: SIGNOUT
    };
}