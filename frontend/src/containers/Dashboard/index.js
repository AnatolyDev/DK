import React, { useState } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { resetUser } from '../../actions/auth.js';

const Dashboard = (props) => {

    const [editPersonalData, setEditPersonalData] = useState(false);
    const [editPassword, setEditPassword] = useState(false);

    return (
        <>
            {!props.user && <Redirect to='/signin' />}
            <Container maxWidth='sm'>
                <Typography component='div' className='dashboard' >
                    <div className='dashboard-title'>
                        Личные данные
                    </div>
                    <div> 
                        <TextField
                            disabled={editPersonalData ? false : true}
                            id='user-name'
                            label='Имя'
                            defaultValue={props.user}
                        />
                    </div>
                    <div>
                        <TextField
                            disabled={editPersonalData ? false : true}
                            id='user-email'
                            label='Email'
                            defaultValue={props.email}
                        />
                    </div>
                    <div>
                        <TextField
                            disabled={editPersonalData ? false : true}
                            id='user-birthday'
                            label='Дата рождения'
                            defaultValue={props.birthday}
                        />
                    </div>
                    {!editPersonalData &&
                        <div>
                            <Button onClick={() => setEditPersonalData(true)}>
                                Редактировать
                            </Button>
                        </div>
                    }
                    {editPersonalData &&
                        <div>
                            <Button onClick={() => setEditPersonalData(false)}>
                                Сохранить
                            </Button>
                            <Button onClick={() => setEditPersonalData(false)}>
                                Отмена
                            </Button>
                        </div>
                    }
                    <div>
                        <TextField
                            disabled={editPassword ? false : true}
                            id='user-password'
                            type='password'
                            label='Пароль'
                            defaultValue={111111}
                        />
                    </div>
                    {!editPassword &&
                        <div>
                            <Button onClick={() => setEditPassword(true)}>
                                Изменить пароль
                            </Button>
                        </div>
                    }
                    {editPassword &&
                        <div>
                            <Button onClick={() => setEditPassword(false)}>
                                Сохранить
                            </Button>
                            <Button onClick={() => setEditPassword(false)}>
                                Отмена
                            </Button>
                        </div>
                    }
                    <div>
                        <Button className='dashboard-btn-exit' onClick={props.resetUser}>
                            Выйти
                        </Button>
                    </div>
                </Typography>
            </Container>
        </>
    )
}

const mapStateToProps = state => ({
    user  : state.auth.user,
    email : state.auth.email,
    birthday : state.auth.birthday
})

const mapDispatchToProps = {
    resetUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);