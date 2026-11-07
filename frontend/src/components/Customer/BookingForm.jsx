import React, { useState } from 'react';
import bookingService from '../../services/bookingService';
import loggerService from '../../services/loggerService';

const BookingForm = ({ turf, customerId, onClose }) => {
  const [formData, setFormData] = useState({
    turfId: turf.id,
    customerId: customerId,
    bookingDate: '',
    startTime: '',
    endTime: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (new Date(formData.bookingDate) < new Date().setHours(0, 0, 0, 0)) {
      setError('Cannot book for past dates');
      setLoading(false);
      return;
    }

    if (formData.startTime >= formData.endTime) {
      setError('End time must be after start time');
      setLoading(false);
      return;
    }

    try {
      // Log booking attempt
      await loggerService.logInfo(
        `Booking attempt - Turf: ${turf.name}, Date: ${formData.bookingDate}, Time: ${formData.startTime}-${formData.endTime}`
      );

      await bookingService.createBooking(formData);

      // Log successful booking
      await loggerService.logInfo(
        `Booking successful - Turf: ${turf.name}, Date: ${formData.bookingDate}`,
        `Customer ID: ${customerId}`
      );

      alert('Booking successful!');
      onClose();
    } catch (err) {
      // Log booking failure
      await loggerService.logError(
        `Booking failed - Turf: ${turf.name}`,
        err
      );

      setError(err.response?.data || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Book {turf.name}</h2>
        
        <div className="turf-info">
          <p><strong>Sports:</strong> {turf.sportsType}</p>
          <p><strong>Location:</strong> {turf.location}</p>
          <p><strong>Price:</strong> ₹{turf.pricePerHour}/hour</p>
          <p><strong>Available Time:</strong> {turf.availableFrom} - {turf.availableTo}</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Booking Date *</label>
            <input
              type="date"
              name="bookingDate"
              value={formData.bookingDate}
              onChange={handleChange}
              className="form-control"
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Time *</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="form-control"
                min={turf.availableFrom}
                max={turf.availableTo}
                required
              />
            </div>

            <div className="form-group">
              <label>End Time *</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="form-control"
                min={turf.availableFrom}
                max={turf.availableTo}
                required
              />
            </div>
          </div>

          <div className="booking-summary">
            <p className="note">
              * The total price will be calculated automatically based on duration
            </p>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;