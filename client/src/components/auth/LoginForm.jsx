import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      navigate('/rooms');
    } catch (err) {
      setError(err.response?.data?.message || 'Email ou mot de passe incorrect.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} id="login-form">
      {error && (
        <div className="alert-error" id="login-error">
          {error}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="login-email" className="form-label">Adresse email</label>
        <input
          type="email"
          id="login-email"
          className="form-input"
          placeholder="name@exclusive.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="login-password" className="form-label">Mot de passe</label>
        <input
          type="password"
          id="login-password"
          className="form-input"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
      </div>

      <button
        type="submit"
        className="btn-primary w-full"
        disabled={loading}
        id="login-submit-btn"
      >
        {loading ? (
          <>
            <span className="spinner"></span>
            Verifying...
          </>
        ) : (
          'Grant Access'
        )}
      </button>
    </form>
  );
};

export default LoginForm;
