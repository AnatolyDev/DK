import { SIGNIN } from '../constants';

export function setUser(user) {
    return {
        type: SIGNIN,
        payload: user
    };
}