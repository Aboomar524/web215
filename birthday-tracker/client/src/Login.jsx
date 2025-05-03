import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [isSignup, setIsSignup] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (isSignup) {
            if (localStorage.getItem(`user_${username}`)) {
                setError('This username is already taken.');
            } else {
                localStorage.setItem(`user_${username}`, password);
                alert('Account created! You can now log in.');
                setIsSignup(false);
                setUsername('');
                setPassword('');
            }
        } else {
            const savedPassword = localStorage.getItem(`user_${username}`);
            if (savedPassword && savedPassword === password) {
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('currentUser', username); // ✅ تخزين اسم المستخدم الحالي
                onLogin();
            } else {
                setError('Invalid username or password');
            }
        }
    };

    return (
        <div style={styles.page}>
            <form style={styles.box} onSubmit={handleSubmit}>
                <h2 style={styles.title}>{isSignup ? 'Create Account' : 'Login to Birthday Tracker'}</h2>
                {error && <p style={styles.error}>{error}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>
                    {isSignup ? 'Sign Up' : 'Login'}
                </button>
                <p style={styles.footerText}>
                    {isSignup ? 'Already have an account?' : "Don’t have an account?"}
                    <span
                        style={styles.signup}
                        onClick={() => {
                            setIsSignup(!isSignup);
                            setError('');
                            setUsername('');
                            setPassword('');
                        }}
                    >
                        {isSignup ? ' Login here' : ' Sign up here'}
                    </span>
                </p>
            </form>
        </div>
    );
};

const styles = {
    page: {
        backgroundColor: '#111',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    },
    box: {
        backgroundColor: '#1e1e1e',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 0 20px rgba(255, 255, 255, 0.05)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
        color: 'white',
    },
    title: {
        marginBottom: '20px',
    },
    input: {
        display: 'block',
        width: '100%',
        padding: '12px',
        marginBottom: '15px',
        borderRadius: '6px',
        border: 'none',
        backgroundColor: '#2a2a2a',
        color: '#fff',
        fontSize: '16px',
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#ff5f5f',
        color: 'white',
        fontSize: '16px',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'background 0.3s ease',
    },
    footerText: {
        marginTop: '15px',
        color: '#ccc',
    },
    signup: {
        color: 'yellow',
        cursor: 'pointer',
        marginLeft: '5px',
    },
    error: {
        color: 'red',
        marginBottom: '15px',
    },
};

export default Login;
