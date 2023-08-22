import React, { useState } from 'react';

import { useMutation } from 'react-query';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

import { Modal, Box, TextField, Button, Typography } from '@mui/material';

import config from '../../config';

function SignUpForm({ open, onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const {
        mutate: signUp,
        isSuccess: isSignUpSuccess,
        data: signUpData,
    } = useMutation(
        async ({
            firstName,
            lastName,
            username,
            displayName,
            email,
            password,
        }) => {
            let { data, status } = await axios.post(`${config.api}/users`, {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                username: username,
                displayName: displayName,
            });
            return { data, status };
        },
        {
            onSuccess: async () => {
                try {
                    const signInResponse = await axios.post(
                        `${config.api}/users/login`,
                        {
                            email: email,
                            password: password,
                        }
                    );

                    if (signInResponse.data.token) {
                        localStorage.setItem(
                            'auth',
                            JSON.stringify(signInResponse.data)
                        );
                    }
                } catch (error) {
                    console.error('Sign-in error: ', error);
                }
            },
        }
    );

    const onSignUp = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        } else {
            setPasswordError('');
        }
        try {
            signUp({
                email,
                password,
                firstName,
                lastName,
                username,
                displayName,
            });
        } catch (error) {
            console.error('Sign up or sign in error: ', error);
        }
    };

    if (isSignUpSuccess) {
        return <Navigate to="/home" />;
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h5" component="h2">
                    Sign Up
                </Typography>
                <form onSubmit={onSignUp}>
                    <TextField
                        required
                        label="First Name"
                        fullWidth
                        margin="normal"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        required
                        label="Last Name"
                        fullWidth
                        margin="normal"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <TextField
                        required
                        label="Username"
                        fullWidth
                        margin="normal"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        required
                        label="Display Name"
                        fullWidth
                        margin="normal"
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                    <TextField
                        required
                        label="Email"
                        fullWidth
                        margin="normal"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        required
                        label="Password"
                        fullWidth
                        margin="normal"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        required
                        label="Confirm Password"
                        fullWidth
                        error={!!passwordError}
                        helperText={passwordError}
                        margin="normal"
                        type="password"
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setPasswordError('');
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        type="submit"
                    >
                        Sign Up
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}

export default SignUpForm;
