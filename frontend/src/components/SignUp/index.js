import React, { useState } from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';

import { authAPI } from '../../api';

const SignUp = () => {

    const [login, setLogin] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const { enqueueSnackbar } = useSnackbar();

    const handleLogin = e => {
        setLogin(e.target.value.trim())
    }

    const handlePassword1 = e => {
        setPassword1(e.target.value.trim())
    }

    const handlePassword2 = e => {
        setPassword2(e.target.value.trim())
    }

    const handleShowSnackbar = (variant, message) => () => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, { variant });
    };

    const handleRegClick = () => {
        if (!login) {
            handleShowSnackbar('error','Пустой логин!')();
            //alert('Пустой логин!');
            return
        }

        if (!password1) {
            handleShowSnackbar('error','Пустой пароль!')();
            //alert('Пустой пароль!');
            return
        }

        if (password1 !== password2) {
            handleShowSnackbar('error','Пароли не совпадают!')();
            //alert('Пароли не совпадают!');
            return
        }

        authAPI.registerUser(login, password1);
        handleShowSnackbar('success','Отлично!')();
    }

    return (
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
                        onChange={handlePassword1}
                    />
                </div>
                <div>
                    <TextField
                        id="standard-password-input"
                        label="Retype password"
                        type="password"
                        autoComplete="current-password"
                        onChange={handlePassword2}
                    />
                </div>
                <div>
                    <Button onClick={handleRegClick}>
                        Зарегистрировать
                    </Button>
                </div>
            </Typography>
        </Container>
    )
}

export default function SignUpNotistack() {
    return (
      <SnackbarProvider maxSnack={3}>
        <SignUp />
      </SnackbarProvider>
    );
  }