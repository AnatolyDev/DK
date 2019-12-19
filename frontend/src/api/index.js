import axios from 'axios';

const instance =  axios.create(
    {
        baseURL: 'http://localhost:5000',
        timeout : 5000,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
)

export const authAPI = {
    registerUser(login, password) {
        async function regUserFunc(login, password) {
            const u = {
                'name' : login,
                'password' : password
            }
            try {
                console.log(1);
                const r = await instance.post('/auth/user/', u);
                console.log(2);
                return r.msg;
            }
            catch(e) {
                console.log(3);
                return e
            }
        }
        return regUserFunc(login, password);
        /*return instance.post('/auth/user/')
        .then(
            response => response.data
        )*/
    }
}