import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import './App.css';

function App() {
  const [theme, setTheme] = useState('dark');
  const [animatingNav, setAnimatingNav] = useState(null);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleNavClick = (nav) => {
    setAnimatingNav(nav);
    setTimeout(() => setAnimatingNav(null), 180); // match animation duration
  };

  return (
    <>
      <header>
        <nav className="navbar">
          <div className="logo">
            <img
              src="https://img.icons8.com/ios-filled/50/ffffff/source-code.png"
              alt="logo"
              className="logo-icon"
            />
          </div>
          <ul className="nav-links">
            <li>
              <Link
                to="/"
                className={`nav-item${animatingNav === 'home' ? ' nav-zoomout' : ''}`}
                onClick={() => handleNavClick('home')}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`nav-item${animatingNav === 'about' ? ' nav-zoomout' : ''}`}
                onClick={() => handleNavClick('about')}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/skills"
                className={`nav-item${animatingNav === 'skills' ? ' nav-zoomout' : ''}`}
                onClick={() => handleNavClick('skills')}
              >
                Skills
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className={`nav-item${animatingNav === 'projects' ? ' nav-zoomout' : ''}`}
                onClick={() => handleNavClick('projects')}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`nav-item${animatingNav === 'contact' ? ' nav-zoomout' : ''}`}
                onClick={() => handleNavClick('contact')}
              >
                Contact
              </Link>
            </li>
          </ul>
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
