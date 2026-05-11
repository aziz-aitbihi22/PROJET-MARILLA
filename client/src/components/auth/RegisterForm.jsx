import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/rooms');
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} id="register-form">
      {error && (
        <div className="alert-error" id="register-error">
          {error}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="register-name" className="form-label">Full Name</label>
        <input
          type="text"
          id="register-name"
          className="form-input"
          placeholder="Jean-Luc Picard"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="register-email" className="form-label">Email Address</label>
        <input
          type="email"
          id="register-email"
          className="form-input"
          placeholder="name@exclusive.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="register-password" className="form-label">Password</label>
        <input
          type="password"
          id="register-password"
          className="form-input"
          placeholder="Au moins 6 caractères"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="register-confirm" className="form-label">Confirmer le mot de passe</label>
        <input
          type="password"
          id="register-confirm"
          className="form-input"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
          required
        />
      </div>

      <button
        type="submit"
        className="btn-primary w-full"
        disabled={loading}
        id="register-submit-btn"
      >
        {loading ? (
          <>
            <span className="spinner"></span>
            Verifying...
          </>
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
