import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const API_URL = process.env.REACT_APP_API_URL.replace('/birthdays', '/auth');

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('username', data.username);
                Swal.fire('Welcome!', 'Logged in successfully', 'success').then(() => {
                    navigate('/');
                });
            } else {
                setMessage(data.message || 'Login failed');
            }
        } catch (err) {
            setMessage('Network error. Please try again.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', marginTop: '100px' }}>
            <h2 className="mb-3">Login</h2>
            {message && <p style={{ color: 'red' }}>{message}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
                <button type="submit" style={{ width: '100%', padding: '8px' }}>Login</button>
            </form>
            <p className="mt-3 text-center">
                Don't have an account? <a href="/register">Register</a>
            </p>
        </div>
    );
}

export default Login;
