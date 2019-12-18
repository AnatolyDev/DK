import React, { useState } from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const SignUp = () => {

    const [login, setLogin] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const handleLogin = e => {
        setLogin(e.target.value)
    }

    const handlePassword1 = e => {
        setPassword1(e.target.value)
    }

    const handlePassword2 = e => {
        setPassword2(e.target.value)
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
                    <Button onClick={loginClick}>
                        Войти
                    </Button>
                </div>
            </Typography>
        </Container>
    )
}

export default SignUp;