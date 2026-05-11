import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RoomsPage from './pages/RoomsPage';
import RoomDetails from './pages/RoomDetails';
import MyReservationsPage from './pages/MyReservationsPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/rooms" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/my-reservations" element={<MyReservationsPage />} />
          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/rooms" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
