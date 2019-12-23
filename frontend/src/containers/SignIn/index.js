import React, { useState } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { setUser } from '../../actions/auth.js';
import { SnackbarProvider, useSnackbar } from 'notistack';

const SignIn = (props) => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const { enqueueSnackbar } = useSnackbar();

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
            props.setUser(login)
        } else {
            handleShowSnackbar('error', 'Логин и пароль не должны быть пустыми')();
        };
    }

    const handleShowSnackbar = (variant, message) => () => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, { variant });
    };

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

/*const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentUser: (login) => {
            dispatch(setUser(login));
        }
    }
};*/

const mapDispatchToProps = ({
    setUser
})

export default connect(mapStateToProps, mapDispatchToProps)(
        function(props) {
            return (
                <SnackbarProvider maxSnack={3}>
                    <SignIn {...props}/>
                </SnackbarProvider>
            )
        }
    );