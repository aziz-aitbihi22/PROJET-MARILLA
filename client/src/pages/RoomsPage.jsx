import { useState, useEffect, useCallback } from 'react';
import { getRooms } from '../services/api';
import RoomCard from '../components/rooms/RoomCard';
import RoomFilters from '../components/rooms/RoomFilters';
import './RoomsPage.css';

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterType, setFilterType] = useState('all');

  const fetchRooms = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getRooms(); // Fetch all rooms, filter locally for simplicity like original
      setRooms(data);
    } catch (err) {
      setError('Impossible de charger les chambres. Veuillez réessayer.');
      console.error('Error fetching rooms:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const filteredRooms = rooms.filter(room => {
    const typeMapping = {
      'Solo': 'solo',
      'Double': 'double',
      'Luxury': 'luxury'
    };
    
    // Original design used lowercase values
    const normalizedType = room.type ? room.type.toLowerCase() : '';
    const matchesType = filterType === 'all' || normalizedType === filterType || typeMapping[room.type] === filterType;
    return matchesType;
  });

  return (
    <div className="animate-fade-in duration-1000">
      {/* Cinematic Hero */}
      <section className="hero-section">
        <img 
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2000" 
          className="hero-img" 
          alt="Hero"
        />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-label">Est. 1924</span>
          <h1 className="hero-title">Celestial Comfort.</h1>
          <p className="hero-subtitle">
            "Discover our meticulously curated collection of sanctuaries."
          </p>
        </div>
      </section>

      {/* Discovery Section */}
      <section className="discovery-section">
        <header className="discovery-header">
          <div>
            <span className="label-micro">The Collection</span>
            <h2 className="discovery-title">Available Suites</h2>
          </div>
          
          <RoomFilters filterType={filterType} setFilterType={setFilterType} />
        </header>

        {loading && (
          <div className="rooms-grid">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="room-skeleton"></div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="alert-error">
            {error}
            <button className="btn-link" onClick={fetchRooms} style={{ marginLeft: '1rem' }}>
              Réessayer
            </button>
          </div>
        )}

        {!loading && !error && filteredRooms.length === 0 && (
          <div className="empty-state-lux">
            <p className="empty-state-text">No suites match your criteria.</p>
          </div>
        )}

        {!loading && !error && filteredRooms.length > 0 && (
          <div className="rooms-grid">
            {filteredRooms.map((room, index) => (
              <RoomCard
                key={room._id}
                room={room}
                index={index}
                onReservationCreated={fetchRooms}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default RoomsPage;
