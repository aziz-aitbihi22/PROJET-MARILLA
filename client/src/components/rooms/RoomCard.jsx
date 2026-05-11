import { useNavigate } from 'react-router-dom';
import './RoomCard.css';

const RoomCard = ({ room, index }) => {
  const navigate = useNavigate();

  // Premium fallback image matching minimalist hotel aesthetic
  const fallbackImage = 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1000';
  const imageUrl = room.images && room.images.length > 0 ? room.images[0] : fallbackImage;

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  const handleCardClick = () => {
    navigate(`/rooms/${room._id}`);
  };

  return (
    <div 
      className="room-card group animate-fade-in-up" 
      style={{ animationDelay: `${index * 150}ms` }}
      onClick={handleCardClick}
    >
      <div className="room-image-wrapper">
        <img 
          src={imageUrl} 
          alt={`Chambre ${room.roomNumber}`} 
          className="room-image" 
          onError={handleImageError}
        />
        <div className="room-number-badge">
          Unit {room.roomNumber}
        </div>
      </div>

      <div className="room-details">
        <div className="room-header">
          <h3 className="room-title">{room.type} Residence</h3>
          <span className="room-price">
            ${room.price}<span className="price-label">/ Night</span>
          </span>
        </div>
        
        <p className="room-description">
          {room.description || 'Découvrez le confort ultime dans cette chambre luxueuse.'}
        </p>

        <div className="room-amenities">
          {(room.amenities && room.amenities.length > 0 ? room.amenities.slice(0, 3) : ['Wifi', 'Mini-Bar', 'Jacuzzi']).map(amenity => (
            <span key={amenity} className="amenity-badge">{amenity}</span>
          ))}
        </div>

        <div className="mt-6">
          <button className="btn-link" onClick={(e) => { e.stopPropagation(); handleCardClick(); }}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
