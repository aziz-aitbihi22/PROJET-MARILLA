import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { addDays, parseISO } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import { getRoom, getRoomReservations, createReservation } from '../services/api';
import "react-datepicker/dist/react-datepicker.css";
import './RoomDetails.css';

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [room, setRoom] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const roomData = await getRoom(id);
        setRoom(roomData);
        
        const resData = await getRoomReservations(id);
        setReservations(resData);
      } catch (err) {
        setError("Impossible de charger les détails de la chambre.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const excludeDateIntervals = reservations.map(res => ({
    start: parseISO(res.checkIn),
    end: parseISO(res.checkOut)
  }));

  const handleBooking = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (!startDate || !endDate) {
      setBookingError("Veuillez sélectionner vos dates de séjour.");
      return;
    }
    
    setBookingLoading(true);
    setBookingError('');
    try {
      await createReservation({ 
        roomId: id, 
        checkIn: startDate.toISOString().split('T')[0], 
        checkOut: endDate.toISOString().split('T')[0] 
      });
      navigate('/my-reservations');
    } catch (err) {
      setBookingError(err.response?.data?.message || 'Erreur lors de la réservation.');
    } finally {
      setBookingLoading(false);
    }
  };

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setBookingError('');
  };

  if (loading) {
    return (
      <div className="flex-center" style={{ minHeight: '80vh' }}>
        <span className="spinner" style={{ borderColor: 'rgba(0,0,0,0.1)', borderTopColor: 'var(--color-stone-900)' }}></span>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="flex-center" style={{ minHeight: '80vh' }}>
        <div className="alert-error">{error || "Chambre non trouvée"}</div>
      </div>
    );
  }

  const fallbackImage = 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2000';
  const imageUrl = room.images && room.images.length > 0 ? room.images[0] : fallbackImage;

  return (
    <div className="animate-fade-in duration-500 room-details-page">
      {/* Cinematic Hero */}
      <section className="details-hero">
        <img 
          src={imageUrl} 
          alt={`Unit ${room.roomNumber}`} 
          className="details-hero-img"
          onError={(e) => { e.target.src = fallbackImage; }}
        />
        <div className="details-hero-overlay"></div>
        <div className="details-hero-content">
          <span className="label-micro-light">Unit {room.roomNumber}</span>
          <h1 className="details-hero-title">{room.type} Residence</h1>
        </div>
      </section>

      {/* Content Grid */}
      <section className="details-container">
        <div className="details-grid">
          {/* Left Column: Description & Amenities */}
          <div className="details-info">
            <h2 className="details-section-title">The Sanctuary</h2>
            <p className="details-description">{room.description}</p>
            
            <div className="details-amenities-section">
              <h3 className="details-subsection-title">Amenities</h3>
              <ul className="details-amenities-list">
                {(room.amenities && room.amenities.length > 0 ? room.amenities : ['Wifi', 'Mini-Bar', 'Jacuzzi']).map(amenity => (
                  <li key={amenity} className="details-amenity-item">
                    <span className="amenity-dot"></span>
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="details-capacity">
              <span className="label-micro">Capacity</span>
              <p className="capacity-text">Up to {room.capacity} Guest{room.capacity > 1 ? 's' : ''}</p>
            </div>
          </div>

          {/* Right Column: Reservation Widget */}
          <div className="details-booking">
            <div className="booking-widget">
              <div className="booking-widget-header">
                <span className="widget-price">${room.price}</span>
                <span className="widget-price-label">/ Night</span>
              </div>
              
              <div className="booking-widget-body">
                <h3 className="widget-subtitle">Select your dates</h3>
                
                <div className="custom-datepicker-wrapper">
                  <DatePicker
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                    minDate={new Date()}
                    excludeDateIntervals={excludeDateIntervals}
                    monthsShown={1}
                  />
                </div>
                
                {bookingError && (
                  <div className="alert-error" style={{ margin: '1rem 0', fontSize: '0.875rem' }}>
                    {bookingError}
                  </div>
                )}
                
                <button 
                  className="btn-primary w-full mt-4" 
                  onClick={handleBooking}
                  disabled={bookingLoading}
                >
                  {bookingLoading ? 'Processing...' : 'Reserve Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoomDetails;
