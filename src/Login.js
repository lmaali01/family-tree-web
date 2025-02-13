import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = ({ setAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.API_HOST}/api/login`, { username, password })
            .then(response => {
                if (response.data.authenticated) {
                    setAuthenticated(true);
                } else {
                    alert('Invalid credentials');
                }
            })
            .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginPage;
