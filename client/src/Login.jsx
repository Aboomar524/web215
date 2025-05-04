import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (res.ok && data.username) {
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
        <div
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #74ebd5, #ACB6E5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            <h1 style={{ color: '#fff', marginBottom: '20px' }}>🎂 Birthday Tracker</h1>

            <div
                style={{
                    backgroundColor: '#fff',
                    padding: '30px',
                    borderRadius: '12px',
                    boxShadow: '0 0 20px rgba(0,0,0,0.1)',
                    width: '100%',
                    maxWidth: '400px',
                }}
            >
                <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Login</h2>
                {message && <p style={{ color: 'red' }}>{message}</p>}

                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginBottom: '15px',
                            border: '1px solid #ccc',
                            borderRadius: '6px',
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginBottom: '15px',
                            border: '1px solid #ccc',
                            borderRadius: '6px',
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: '#4A90E2',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                        }}
                    >
                        Login
                    </button>
                </form>

                <p className="mt-3 text-center" style={{ marginTop: '15px' }}>
                    Don’t have an account?{' '}
                    <Link to="/register" style={{ color: '#4A90E2' }}>
                        Register
                    </Link>
                </p>
            </div>

            <p style={{ color: '#fff', marginTop: '20px' }}>© Designed by Ahmad Alhomair</p>
        </div>
    );
}

export default Login;
