import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import config from '../../config';

function LoginPage({ setAuthenticatedUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { mutate, isSuccess, data } = useMutation(
        async ({ email, password }) => {
            let { data: body, status } = await axios.post(
                `${config.api}/users/login`,
                {
                    email: email,
                    password: password,
                }
            );
            return { body, status };
        }
    );

    const onLogin = (e) => {
        e.preventDefault();
        mutate({ email, password });
    };

    if (isSuccess && data.status === 200) {
        setAuthenticatedUser(data.body);
        console.log(setAuthenticatedUser);
        return <Navigate to="/home" />;
    }

    const renderLoginForm = () => {
        return (
            <Paper height="100%" sx={{ padding: '2em 6em' }}>
                <form onSubmit={onLogin}>
                    <Grid container direction="column" alignItems="center">
                        <Typography
                            variant="h4"
                            sx={{
                                padding: '0em 1em',
                                margin: '0.5em 0em',
                                fontWeight: 'bold',
                            }}
                        >
                            Sign in to Twitter
                        </Typography>

                        <TextField
                            label="Email"
                            margin="dense"
                            placeholder="bruce@wayne.com"
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Password"
                            margin="dense"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                        />

                        <Button
                            variant="contained"
                            type="submit"
                            size="large"
                            fullWidth
                            disableElevation
                            sx={{ margin: '2em 0em', bgcolor: '#000' }}
                        >
                            <Typography color="white">Login</Typography>
                        </Button>
                    </Grid>
                </form>
            </Paper>
        );
    };

    return (
        <Grid container height="100%" sx={{ bgcolor: 'primary.main' }}>
            <Grid
                container
                height="100%"
                direction="column"
                justifyContent="center"
            >
                <Grid item alignSelf="center">
                    {renderLoginForm()}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default LoginPage;
