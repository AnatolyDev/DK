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
            alarms : {"msg" : "Сервер не отвечает"},
            status : -1
        }
    } else {
        // прочие ошибки
        return {
            alarms : {"msg" : error.message},
            status : -2
        }
    }
}

export const authAPI = {
    registerUser(login, password) {
        async function regUserFunc(login, password) {
            const user = {
                'name' : login,
                'password' : password
            }
            try {
                const r = await instance.post('/auth/user/', user);
                return r.msg;
            }
            catch(e) {
                console.log(0);
                throw e
            }
        }

        return regUserFunc(login, password);
    },

    loginUser(login, password) {
        async function signIn(login, password) {
            const user = {
                'name' : login,
                'password' : password
            }
            try {
                const r = await instance.post('/auth/login/', user);
                return r.msg;
            } catch(e) {
                throw e
            }
        }

        return signIn(login, password);
    }
}

export const afishaAPI = {
    getEvents(startData) {
        return new Promise(
            resolve => {
                setTimeout(
                    () => {
                        resolve({
                            'events' : [
                                {
                                    'dateAt' : '2020-05-02',
                                    'title' : 'Концерт Руки вверх',
                                    'imageURL' : '/img/1.png',
                                },
                                {
                                    'dateAt' : '2020-05-03',
                                    'title' : 'Симфония',
                                    'imageURL' : '/img/2.png',
                                },,
                                {
                                    'dateAt' : '2020-05-04',
                                    'title' : 'Группа 23',
                                    'imageURL' : '/img/3.png',
                                },
                                {
                                    'dateAt' : '2020-05-06',
                                    'title' : 'Группа Краски',
                                    'imageURL' : '/img/4.png',
                                },
                                {
                                    'dateAt' : '2020-06-06',
                                    'title' : 'Prodigy',
                                    'imageURL' : '/img/5.png',
                                },
                                {
                                    'dateAt' : '2020-06-21',
                                    'title' : 'Eminem',
                                    'imageURL' : '/img/6.png',
                                },
                                {
                                    'dateAt' : '2020-06-30',
                                    'title' : 'Plazma',
                                    'imageURL' : '/img/7.png',
                                }
                            ],
                        })
                    }
                ,1000)
            }
        )
    }
}