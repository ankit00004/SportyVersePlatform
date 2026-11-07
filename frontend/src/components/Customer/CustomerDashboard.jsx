import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import turfService from '../../services/turfService';
import bookingService from '../../services/bookingService';
import BookingForm from './BookingForm';
import BookingHistory from './BookingHistory';
import './Customer.css';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [turfs, setTurfs] = useState([]);
  const [selectedTurf, setSelectedTurf] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [activeTab, setActiveTab] = useState('turfs');

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || currentUser.role !== 'CUSTOMER') {
      navigate('/login');
      return;
    }
    setUser(currentUser);
    loadTurfs();
  }, [navigate]);

  const loadTurfs = async () => {
    try {
      const turfsData = await turfService.getAllTurfs();
      setTurfs(turfsData);
    } catch (error) {
      console.error('Error loading turfs:', error);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const handleBookTurf = (turf) => {
    setSelectedTurf(turf);
    setShowBookingForm(true);
  };

  const handleBookingFormClose = () => {
    setShowBookingForm(false);
    setSelectedTurf(null);
  };

  const handlePayment = () => {
    alert('Payment gateway integration coming soon!');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Sportyverse Customer Portal</h1>
        <div className="header-actions">
          <span>Welcome, {user?.fullName}</span>
          <button onClick={handlePayment} className="btn btn-payment">
            💳 Payment
          </button>
          <button onClick={handleLogout} className="btn btn-logout">
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-tabs">
        <button
          className={`tab ${activeTab === 'turfs' ? 'active' : ''}`}
          onClick={() => setActiveTab('turfs')}
        >
          Available Turfs
        </button>
        <button
          className={`tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Booking History
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'turfs' && (
          <div className="turfs-section">
            <h2>Available Turfs for Booking</h2>
            <div className="turfs-grid">
              {turfs.map((turf) => (
                <div key={turf.id} className="turf-card">
                  <div className="turf-header">
                    <h3>{turf.name}</h3>
                    <span className="sports-badge">{turf.sportsType}</span>
                  </div>
                  <p><strong>📍 Location:</strong> {turf.location}</p>
                  <p><strong>💰 Price:</strong> ₹{turf.pricePerHour}/hour</p>
                  <p><strong>👥 Capacity:</strong> {turf.capacity} people</p>
                  <p>
                    <strong>⏰ Available:</strong> {turf.availableFrom} - {turf.availableTo}
                  </p>
                  {turf.description && (
                    <p className="description">{turf.description}</p>
                  )}
                  <button
                    onClick={() => handleBookTurf(turf)}
                    className="btn btn-primary btn-book"
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>

            {turfs.length === 0 && (
              <p className="no-data">No turfs available at the moment.</p>
            )}
          </div>
        )}

        {activeTab === 'history' && user && (
          <BookingHistory customerId={user.id} />
        )}
      </div>

      {showBookingForm && (
        <BookingForm
          turf={selectedTurf}
          customerId={user?.id}
          onClose={handleBookingFormClose}
        />
      )}
    </div>
  );
};

export default CustomerDashboard;