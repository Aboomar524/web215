import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const API_URL = process.env.REACT_APP_API_URL.replace('/birthdays', '/auth');

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (res.ok) {
                Swal.fire('Success', 'User registered successfully!', 'success').then(() => {
                    navigate('/login');
                });
            } else {
                setMessage(data.message || 'Registration failed');
            }
        } catch (err) {
            setMessage('Network error. Please try again.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', marginTop: '100px' }}>
            <h2 className="mb-3">Register</h2>
            {message && <p style={{ color: 'red' }}>{message}</p>}
            <form onSubmit={handleRegister}>
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
                <button type="submit" style={{ width: '100%', padding: '8px' }}>Register</button>
            </form>
            <p className="mt-3 text-center">
                Already have an account? <a href="/login">Login</a>
            </p>
        </div>
    );
}

export default Register;
