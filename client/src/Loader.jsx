import React from 'react';

const Loader = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <div className="spinner-border text-primary mb-3" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted">Waking up server...</p>
        </div>
    );
};

export default Loader;
