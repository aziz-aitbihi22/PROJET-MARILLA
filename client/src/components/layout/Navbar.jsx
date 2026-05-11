import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const isActive = (path) => location.pathname === path;

  // Handle scroll effect for glass navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'glass-effect' : ''}`} id="main-navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" id="nav-logo">
          <span className="logo-text">MARIELLA</span>
          <span className="logo-subtext">Grand Hotel & Residences</span>
        </Link>

        {/* Navigation Links */}
        <div className="navbar-menu hide-mobile">
          <Link
            to="/rooms"
            className={`navbar-link ${isActive('/rooms') || isActive('/') ? 'active' : ''}`}
            id="nav-rooms"
          >
            Chambres
          </Link>

          <Link
            to="/contact"
            className={`navbar-link ${isActive('/contact') ? 'active' : ''}`}
            id="nav-contact"
          >
            Contact
          </Link>
          
          {isAuthenticated && (
            <Link
              to="/my-reservations"
              className={`navbar-link ${isActive('/my-reservations') ? 'active' : ''}`}
              id="nav-reservations"
            >
              Mes Séjours
            </Link>
          )}
          
          {user?.role === 'ADMIN' && (
            <Link
              to="/admin"
              className={`navbar-link ${isActive('/admin') ? 'active' : ''}`}
            >
              Admin
            </Link>
          )}
        </div>

        {/* Auth Section */}
        <div className="navbar-auth">
          {!isAuthenticated ? (
            <Link
              to="/login"
              className="btn-pill"
              id="nav-login-btn"
            >
              Connexion
            </Link>
          ) : (
            <div className="navbar-user-section">
              <div className="navbar-welcome hide-mobile">
                <span className="welcome-text">Bon retour</span>
                <span className="user-name">{user.name}</span>
              </div>
              <button
                onClick={logout}
                className="btn-link"
                id="nav-logout-btn"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
