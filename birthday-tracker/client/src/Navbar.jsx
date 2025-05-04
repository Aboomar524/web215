import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('username');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
            <Link to="/" className="navbar-brand">🎉 Birthday Tracker</Link>
            <div className="ms-auto">
                {!username ? (
                    <>
                        <Link to="/login" className="btn btn-light btn-sm me-2">Login</Link>
                        <Link to="/register" className="btn btn-light btn-sm">Register</Link>
                    </>
                ) : (
                    <>
                        <span className="text-white me-3">Welcome, {username}</span>
                        <button onClick={handleLogout} className="btn btn-outline-light btn-sm">Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
