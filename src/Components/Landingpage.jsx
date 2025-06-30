import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';  
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Landingpage() {

    const [darkMode, setDarkMode] = useState(true);

    const toggleMode = () => setDarkMode(!darkMode);

    const navigate = useNavigate();

    const themeClass = darkMode ? 'bg-dark text-white' : 'bg-light text-dark';
    const navClass = darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light';

    return (
        <div className={themeClass} style={{ minHeight: '100vh' }}>
            {/* Navbar */}
            <nav className={`navbar navbar-expand-lg ${navClass}`}>
                <div className="container">
                <a className="navbar-brand" href="#">File to Quiz Generator</a>
                <button onClick={toggleMode} className="btn btn-outline-secondary">
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="d-flex align-items-center justify-content-center vh-100 flex-column text-center" style={{ paddingBottom: '80px' }}>
                <i className="bi bi-file-earmark-text-fill display-1 mb-2 text-primary"></i>
                <h1 className="display-2 fw-bold">File to Quiz Generator</h1>
                <p className="lead mt-3">
                    <i className="bi bi-lightbulb-fill me-2 text-warning"></i>
                    Convert your files into quizzes with one click.
                </p>
                <button className="btn btn-primary btn-lg mt-4" onClick={() => navigate('/home')}>
                    <i className="bi bi-play-circle-fill me-2"></i>
                    Get Started
                </button>
            </div>

            {/* Features */}
            <div className="container my-5">
                <h2 className="text-center mb-4">Why Use File to Quiz Generator?</h2>
                <div className="row text-center">
                    <div className="col-md-4">
                    <i className="bi bi-upload display-4 text-primary mb-3"></i>
                    <h4>Easy File Upload</h4>
                    <p>Quickly upload PDFs, Word docs, or plain text files. No complicated setup needed!</p>
                    </div>
                    <div className="col-md-4">
                    <i className="bi bi-lightning-charge-fill display-4 text-warning mb-3"></i>
                    <h4>Auto-Generate Quizzes</h4>
                    <p>Our smart algorithm instantly converts your content into multiple-choice quizzes.</p>
                    </div>
                    <div className="col-md-4">
                    <i className="bi bi-share-fill display-4 text-success mb-3"></i>
                    <h4>Export & Share</h4>
                    <p>Download quizzes in various formats or share them online with just a click.</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className={`text-center py-3 ${navClass}`}>
                &copy; {new Date().getFullYear()} File to Quiz Generator. All rights reserved.
            </footer>
        </div>
    );
}

export default Landingpage;