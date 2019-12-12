import React, { useState } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { setUser } from '../../actions/auth.js';

const SignIn = (props) => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = e => {
        setLogin(e.target.value)
    }

    const handlePassword = e => {
        setPassword(e.target.value)
    }

    const isUser = (login, password) => {
        if (login && password) return true;
        return false;
    }

    const loginClick = () => {
        if (isUser(login, password)) {
            props.setCurrentUser(login)
        }
            else alert('Логин или пароль пустой');
    }

    return (
        <>
            {props.user && <Redirect to='/' />}
            <Container maxWidth="sm">
                <Typography component="div" className='signin' >
                    <div>
                        <TextField
                            required
                            id="standard-required"
                            label="Login"
                            defaultValue=""
                            onChange={handleLogin}
                        />
                    </div>
                    <div>
                        <TextField
                            id="standard-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            onChange={handlePassword}
                        />
                    </div>
                    <div>
                        <Button onClick={loginClick}>
                            Войти
                        </Button>
                    </div>
                </Typography>
            </Container>
        </>
    )
}

const mapStateToProps = state => ({
    user : state.auth.user
})

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentUser: (login) => {
            dispatch(setUser(login));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);