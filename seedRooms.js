const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Room = require('./src/models/Room');

dotenv.config();

const INITIAL_ROOMS = [
  {
    roomNumber: '101',
    type: 'Suite',
    price: 450,
    capacity: 2,
    description: 'Breathtaking views of the Pacific Ocean with floor-to-ceiling windows and private terrace.',
    isAvailable: true,
    images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1000'],
    amenities: ['Ocean View', 'King Bed', 'Jacuzzi', 'Mini Bar', 'Concierge']
  },
  {
    roomNumber: '202',
    type: 'Double',
    price: 280,
    capacity: 4,
    description: 'Modern comfort for pairs with an elegant golden-themed interior and premium linens.',
    isAvailable: true,
    images: ['https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1000'],
    amenities: ['Two Beds', 'Desk', 'City View', 'Air Conditioning']
  },
  {
    roomNumber: '303',
    type: 'Suite',
    price: 220,
    capacity: 1,
    description: 'Our Zen Garden Single Suite is a masterpiece of solo luxury, featuring a sunken lounge, an artisanal library, and seamless transition to private outdoor meditation grounds.',
    isAvailable: true,
    images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=1000'],
    amenities: ['Private Garden', 'Sunken Lounge', 'Butler Service', 'Personal Library', 'High-Speed Wifi']
  }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hotel_db')
  .then(async () => {
    console.log('Connected to DB');
    await Room.deleteMany({});
    console.log('Cleared existing rooms');
    await Room.insertMany(INITIAL_ROOMS);
    console.log('Inserted seed rooms');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    mongoose.disconnect();
  });
