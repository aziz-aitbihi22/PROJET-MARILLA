import { useState } from 'react';
import { cancelReservation } from '../../services/api';
import './ReservationCard.css';

const ReservationCard = ({ reservation, onCancelled }) => {
  const [loading, setLoading] = useState(false);
  const { room } = reservation;

  const checkIn = new Date(reservation.checkIn).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const checkOut = new Date(reservation.checkOut).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <span className="status-badge success">confirmed</span>;
      case 'pending':
        return <span className="status-badge warning">pending</span>;
      case 'cancelled':
      default:
        return <span className="status-badge danger">cancelled</span>;
    }
  };

  const handleCancel = async () => {
    if (!window.confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) return;

    setLoading(true);
    try {
      await cancelReservation(reservation._id);
      if (onCancelled) onCancelled();
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de l'annulation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="res-card">
      <div className="res-card-left">
        <div className="res-card-header">
          <span className="res-ref">Ref: {reservation._id.slice(-8)}</span>
          {getStatusBadge(reservation.status)}
        </div>
        <h3 className="res-room-name">Chambre {room?.roomNumber || 'N/A'}</h3>
        <p className="res-dates">{checkIn} to {checkOut}</p>
      </div>
      
      <div className="res-card-right">
        <div className="res-price-block">
          <p className="res-price-label">Total Value</p>
          <p className="res-price-value">${reservation.totalPrice}</p>
        </div>
        
        {reservation.status !== 'cancelled' && (
          <button 
            onClick={handleCancel}
            disabled={loading}
            className="btn-danger-link mt-4"
          >
            {loading ? 'Processing...' : 'Withdraw Request'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ReservationCard;
