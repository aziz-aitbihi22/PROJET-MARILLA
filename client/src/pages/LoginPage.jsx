import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/auth/LoginForm';
import './AuthPages.css';

const LoginPage = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/rooms" replace />;
  }

  return (
    <div className="auth-page-container">
      <div className="auth-layout-box animate-fade-in-up">
        {/* Aesthetic Sidebar */}
        <div className="auth-sidebar hide-mobile">
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1400" 
            alt="Luxury Ambiance" 
            className="auth-sidebar-img"
          />
          <div className="auth-sidebar-overlay">
            <h2 className="auth-sidebar-title">Your Journey Awaits.</h2>
            <p className="auth-sidebar-quote">
              "Experience the whisper of luxury that only Mariella can offer."
            </p>
          </div>
        </div>

        {/* Form Content */}
        <div className="auth-form-section">
          <div className="auth-form-wrapper">
            <div className="auth-header text-center">
              <h3 className="auth-title">Sign In</h3>
              <p className="label-micro-dark">Exclusive Entry</p>
            </div>

            <LoginForm />

            <div className="auth-footer text-center">
              <Link to="/register" className="btn-link" id="login-to-register">
                Become a Member
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
