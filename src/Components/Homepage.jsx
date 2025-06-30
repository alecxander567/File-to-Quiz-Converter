import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function QuizCard({ q, index, darkMode }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const handleAnswer = (option) => {
    if (!answered) {
      setSelected(option);
      setAnswered(true);
    }
  };

  const cardClass = darkMode ? 'bg-secondary text-white' : 'bg-white text-dark';

  return (
    <div className={`card ${cardClass} mb-3`}>
      <div className="card-body">
        <strong>Q{index + 1}: {q.question}</strong>
        <ul className="list-group mt-2">
          {q.options.map((option, i) => {
            const optionLabels = ['A', 'B', 'C', 'D'];
            let bgClass = '';
            if (answered) {
                if (option === q.answer) {
                    bgClass = 'bg-success text-white';
                } else if (option === selected) {
                    bgClass = 'bg-danger text-white';
                }
            }

            return (
                <li
                key={i}
                className={`list-group-item d-flex align-items-center ${bgClass} ${darkMode && !bgClass ? 'bg-dark text-white' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => handleAnswer(option)}
                >
                <span>
                    <strong>{optionLabels[i] || String.fromCharCode(65 + i)}.</strong> {option}
                </span>
                </li>
            );
            })}
        </ul>
      </div>
    </div>
  );
}

function Homepage() {
  const [fileName, setFileName] = useState('');
  const [quiz, setQuiz] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  const toggleMode = () => setDarkMode(!darkMode);

  const themeClass = darkMode ? 'bg-dark text-white' : 'bg-light text-dark';
  const navClass = darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light';

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8080/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
        setQuiz(data);
        } catch (error) {
        console.error('Error:', error);
        alert('Failed to upload file or generate quiz.');
        }
    };

  return (
    <div className={`${themeClass} d-flex flex-column`} style={{ minHeight: '100vh' }}>
        {/* Navbar */}
        <nav className={`navbar ${navClass}`}>
            <div className="container">
             <a
                className="navbar-brand"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.reload(); 
                }}
              >
              File to Quiz
              </a>
            <button onClick={toggleMode} className="btn btn-outline-secondary">
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            </div>
        </nav>

        {/* Content */}
        <div className="container mt-5 mb-4 flex-grow-1">
            <h2 className="mb-4 text-center">
            <i className="bi bi-upload me-2"></i>
            Upload a File to Generate a Quiz
            </h2>

            <div className="mb-4 text-center">
            <input
                type="file"
                accept=".txt,.pdf,.docx,.pptx"
                className="form-control w-50 mx-auto"
                onChange={handleFileUpload}
            />
            {fileName && <p className="mt-2 text-success">Uploaded: {fileName}</p>}
            </div>

            <hr className={darkMode ? 'border-light' : 'border-dark'} />

            <div className="mt-5">
            <h4>Generated Quiz:</h4>
            {quiz ? (
                quiz.length > 0 ? (
                quiz.map((q, index) => (
                    <QuizCard key={index} q={q} index={index} darkMode={darkMode} />
                ))
                ) : (
                <p className="text-muted">No questions were generated.</p>
                )
            ) : (
                <p className="text-muted">No quiz generated yet.</p>
            )}
            </div>
        </div>

        {/* Optional Footer */}
        <footer className={`text-center py-3 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
            <small>&copy; 2025 File to Quiz</small>
        </footer>
    </div>
  );
}

export default Homepage;
