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

// разбор ошибок запроса
export const parseErrorFromAxios = error => {
    if (error.response) {
        // сервер ответил
        return {
            alarms : error.response.data,
            status : error.response.status
        }
    } else if (error.request) {
        // запрос ушёл, но ответа от сервера не получено
        return {
            alarms : {"message" : "Сервер не отвечает"},
            status : -1
        }
    } else {
        // прочие ошибки
        return {
            alarms : {"message" : error.message},
            status : -2
        }
    }
}

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
                console.log(r.msg);
                return r.msg;
            }
            catch(e) {
                console.log(3);
                console.log(e.message);
                throw e
            }
        }
        return regUserFunc(login, password);
        /*return instance.post('/auth/user/')
        .then(
            response => response.data
        )*/
    }
}