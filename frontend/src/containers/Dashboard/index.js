import React, { useState } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Dashboard = (props) => {

    const [editMode, setEditMode] = useState(false);

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
                            disabled={editMode ? false : true}
                            id='user-name'
                            label='Имя'
                            defaultValue={props.user}
                        />
                    </div>
                    <div>
                        <TextField
                            disabled={editMode ? false : true}
                            id='user-email'
                            label='Email'
                            defaultValue={props.email}
                        />
                    </div>
                    <div>
                        <TextField
                            disabled={editMode ? false : true}
                            id='user-birthday'
                            label='Дата рождения'
                            defaultValue={props.birthday}
                        />
                    </div>
                    {!editMode &&
                        <div>
                            <Button onClick={() => setEditMode(true)}>
                                Редактировать
                            </Button>
                        </div>
                    }
                    {editMode &&
                        <div>
                            <Button onClick={() => setEditMode(false)}>
                                Сохранить
                            </Button>
                            <Button onClick={() => setEditMode(false)}>
                                Отмена
                            </Button>
                        </div>
                    }
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

export default connect(mapStateToProps)(Dashboard);