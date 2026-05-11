import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMyReservations } from '../services/api';
import ReservationCard from '../components/reservations/ReservationCard';
import './MyReservationsPage.css';

const MyReservationsPage = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchReservations = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getMyReservations();
      setReservations(data);
    } catch (err) {
      setError('Impossible de charger vos réservations.');
      console.error('Error fetching reservations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchReservations();
    }
  }, [isAuthenticated]);

  if (authLoading) {
    return (
      <div className="reservations-container flex-center">
        <span className="spinner" style={{ borderColor: 'rgba(0,0,0,0.1)', borderTopColor: 'var(--color-stone-900)' }}></span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="animate-fade-in duration-500 reservations-container">
      <header className="reservations-header">
        <h1 className="reservations-title">My Luxury Stays</h1>
        <p className="reservations-subtitle">Manage your upcoming and past experiences at Mariella.</p>
      </header>

      {loading && (
        <div className="flex-center py-12">
          <span className="spinner" style={{ borderColor: 'rgba(0,0,0,0.1)', borderTopColor: 'var(--color-stone-900)' }}></span>
        </div>
      )}

      {!loading && error && (
        <div className="alert-error">
          {error}
          <button className="btn-link" onClick={fetchReservations} style={{ marginLeft: '1rem' }}>
            Réessayer
          </button>
        </div>
      )}

      {!loading && !error && reservations.length === 0 ? (
        <div className="empty-state-lux">
          <p className="empty-state-text">Your travel history is awaiting its first entry.</p>
        </div>
      ) : (
        <div className="reservations-list">
          {reservations.map(res => (
            <ReservationCard 
              key={res._id} 
              reservation={res} 
              onCancelled={fetchReservations} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReservationsPage;
