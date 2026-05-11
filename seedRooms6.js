const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Room = require('./src/models/Room');

dotenv.config();

const LUXURY_ROOMS = [
  {
    roomNumber: '101',
    type: 'Solo',
    price: 250,
    capacity: 1,
    description: 'An intimate sanctuary designed for the solo traveler. Features a plush queen bed, a dedicated workspace, and a rain shower with artisanal bath products.',
    isAvailable: true,
    images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=1000'],
    amenities: ['Queen Bed', 'Workspace', 'Rain Shower', 'High-Speed Wifi']
  },
  {
    roomNumber: '102',
    type: 'Solo',
    price: 280,
    capacity: 1,
    description: 'Elevate your solo journey with our premium solo suite. Enjoy breathtaking city views from a private balcony and unparalleled comfort in our signature bedding.',
    isAvailable: true,
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000'],
    amenities: ['City View', 'Private Balcony', 'Signature Bedding', 'Espresso Machine']
  },
  {
    roomNumber: '201',
    type: 'Double',
    price: 350,
    capacity: 2,
    description: 'A harmonious blend of space and style. This double room offers a serene environment with elegant furnishings, perfect for couples or friends traveling together.',
    isAvailable: true,
    images: ['https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1000'],
    amenities: ['King Bed', 'Lounge Area', 'Smart TV', 'Mini Bar']
  },
  {
    roomNumber: '202',
    type: 'Double',
    price: 380,
    capacity: 2,
    description: 'Experience refined comfort in our superior double room. Boasting expansive windows that flood the room with natural light and a luxurious deep soaking tub.',
    isAvailable: true,
    images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=1000'],
    amenities: ['Deep Soaking Tub', 'Panoramic Windows', 'Room Service', 'Premium Linens']
  },
  {
    roomNumber: '301',
    type: 'Luxury',
    price: 650,
    capacity: 4,
    description: 'The pinnacle of opulence. Our Luxury Residence features a separate living area, a private terrace with ocean views, and exclusive access to the VIP lounge.',
    isAvailable: true,
    images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1000'],
    amenities: ['Ocean View', 'Private Terrace', 'VIP Lounge Access', 'Butler Service']
  },
  {
    roomNumber: '302',
    type: 'Luxury',
    price: 800,
    capacity: 4,
    description: 'Step into a world of unmatched elegance. The Grand Luxury Suite offers a bespoke interior, a private infinity plunge pool, and panoramic vistas of the coastline.',
    isAvailable: true,
    images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1000'],
    amenities: ['Private Plunge Pool', 'Panoramic Views', 'Bespoke Interior', 'Personal Concierge']
  }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hotel_db')
  .then(async () => {
    console.log('Connected to DB');
    await Room.deleteMany({});
    console.log('Cleared existing rooms');
    await Room.insertMany(LUXURY_ROOMS);
    console.log('Inserted 6 luxury seed rooms');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    mongoose.disconnect();
  });
