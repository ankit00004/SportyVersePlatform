import React, { useState, useEffect } from 'react';
import bookingService from '../../services/bookingService';

const BookingHistory = ({ customerId }) => {
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBookings();
  }, [customerId]);

  const loadBookings = async () => {
    try {
      const data = await bookingService.getCustomerBookings(customerId);
      setBookings(data);
    } catch (error) {
      console.error('Error loading bookings:', error);
    }
  };

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setFormData({
      bookingDate: booking.bookingDate,
      startTime: booking.startTime,
      endTime: booking.endTime,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updateData = {
        ...editingBooking,
        ...formData,
      };
      await bookingService.updateBooking(editingBooking.id, updateData);
      alert('Booking updated successfully!');
      setEditingBooking(null);
      loadBookings();
    } catch (error) {
      alert('Failed to update booking. ' + (error.response?.data || ''));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await bookingService.deleteBooking(id);
        alert('Booking cancelled successfully!');
        loadBookings();
      } catch (error) {
        alert('Failed to cancel booking');
      }
    }
  };

  return (
    <div className="history-section">
      <h2>Your Booking History</h2>
      
      {bookings.length > 0 ? (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <div className="booking-header">
                <h3>{booking.turfName}</h3>
                <span className={`status ${booking.status.toLowerCase()}`}>
                  {booking.status}
                </span>
              </div>
              
              <div className="booking-details">
                <p><strong>Sports:</strong> {booking.sportsType}</p>
                <p><strong>Location:</strong> {booking.location}</p>
                <p><strong>Date:</strong> {booking.bookingDate}</p>
                <p><strong>Time:</strong> {booking.startTime} - {booking.endTime}</p>
                <p><strong>Duration:</strong> {booking.totalHours} hours</p>
                <p><strong>Total Price:</strong> ₹{booking.totalPrice}</p>
                <p>
                  <strong>Payment Status:</strong>{' '}
                  <span className={`payment-status ${booking.paymentStatus.toLowerCase()}`}>
                    {booking.paymentStatus}
                  </span>
                </p>
              </div>
              
              {booking.status !== 'CANCELLED' && (
                <div className="booking-actions">
                  <button
                    onClick={() => handleEdit(booking)}
                    className="btn btn-edit"
                  >
                    Edit Time
                  </button>
                  <button
                    onClick={() => handleDelete(booking.id)}
                    className="btn btn-delete"
                  >
                    Cancel Booking
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="no-data">You haven't made any bookings yet.</p>
      )}

      {editingBooking && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Booking Time</h2>
            <p className="edit-info">
              Editing booking for: <strong>{editingBooking.turfName}</strong>
            </p>
            
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Booking Date</label>
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
                  <label>Start Time</label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>End Time</label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setEditingBooking(null)}
                  className="btn btn-secondary"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Updating...' : 'Update Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingHistory;