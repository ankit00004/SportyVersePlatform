import React, { useState, useEffect } from 'react';
import turfService from '../../services/turfService';

const TurfForm = ({ turf, onClose, userId }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    sportsType: '',
    pricePerHour: '',
    description: '',
    capacity: '',
    availableFrom: '06:00',
    availableTo: '22:00',
    createdBy: userId,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (turf) {
      setFormData({
        name: turf.name,
        location: turf.location,
        sportsType: turf.sportsType,
        pricePerHour: turf.pricePerHour,
        description: turf.description || '',
        capacity: turf.capacity,
        availableFrom: turf.availableFrom,
        availableTo: turf.availableTo,
        createdBy: turf.createdBy,
      });
    }
  }, [turf]);

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

    try {
      if (turf) {
        await turfService.updateTurf(turf.id, formData);
      } else {
        await turfService.createTurf(formData);
      }
      onClose();
    } catch (err) {
      setError('Failed to save turf. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{turf ? 'Edit Turf' : 'Add New Turf'}</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Turf Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label>Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Sports Type *</label>
              <select
                name="sportsType"
                value={formData.sportsType}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="">Select Sport</option>
                <option value="Football">Football</option>
                <option value="Cricket">Cricket</option>
                <option value="Basketball">Basketball</option>
                <option value="Badminton">Badminton</option>
                <option value="Tennis">Tennis</option>
                <option value="Volleyball">Volleyball</option>
              </select>
            </div>

            <div className="form-group">
              <label>Price per Hour (₹) *</label>
              <input
                type="number"
                name="pricePerHour"
                value={formData.pricePerHour}
                onChange={handleChange}
                className="form-control"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Capacity (people) *</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="form-control"
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label>Available From *</label>
              <input
                type="time"
                name="availableFrom"
                value={formData.availableFrom}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label>Available To *</label>
              <input
                type="time"
                name="availableTo"
                value={formData.availableTo}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
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
              {loading ? 'Saving...' : turf ? 'Update Turf' : 'Create Turf'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TurfForm;