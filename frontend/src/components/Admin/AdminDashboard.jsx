import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import turfService from '../../services/turfService';
import bookingService from '../../services/bookingService';
import TurfForm from './TurfForm';
import './Admin.css';

// Icons (You can replace with actual icon components or images)
const DashboardIcon = () => <span>📊</span>;
const TurfIcon = () => <span>🏟️</span>;
const BookingIcon = () => <span>📅</span>;
const AddIcon = () => <span>➕</span>;
const EditIcon = () => <span>✏️</span>;
const DeleteIcon = () => <span>🗑️</span>;
const LogoutIcon = () => <span>🚪</span>;
const UserIcon = () => <span>👤</span>;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [turfs, setTurfs] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showTurfForm, setShowTurfForm] = useState(false);
  const [editingTurf, setEditingTurf] = useState(null);
  const [activeTab, setActiveTab] = useState('turfs');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || currentUser.role !== 'ADMIN') {
      navigate('/login');
      return;
    }
    setUser(currentUser);
    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [turfsData, bookingsData] = await Promise.all([
        turfService.getAllTurfs(),
        bookingService.getAllBookings(),
      ]);
      setTurfs(turfsData);
      setBookings(bookingsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const handleDeleteTurf = async (id) => {
    if (window.confirm('Are you sure you want to delete this turf?')) {
      try {
        await turfService.deleteTurf(id);
        loadData();
      } catch (error) {
        alert('Error deleting turf');
      }
    }
  };

  const handleEditTurf = (turf) => {
    setEditingTurf(turf);
    setShowTurfForm(true);
  };

  const handleTurfFormClose = () => {
    setShowTurfForm(false);
    setEditingTurf(null);
    loadData();
  };

  const getBookingStats = () => {
    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter(b => b.status === 'CONFIRMED').length;
    const pendingBookings = bookings.filter(b => b.status === 'PENDING').length;
    const revenue = bookings
      .filter(b => b.status === 'CONFIRMED')
      .reduce((sum, b) => sum + (b.totalPrice || 0), 0);
   
    return { totalBookings, confirmedBookings, pendingBookings, revenue };
  };

  const stats = getBookingStats();

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
        <div className="sidebar-header">
          <h2 className="logo">Sportyverse</h2>
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>
       
        <div className="sidebar-user">
          <div className="user-avatar">
            <UserIcon />
          </div>
          {sidebarOpen && (
            <div className="user-info">
              <h3>{user?.fullName}</h3>
              <p className="user-role">Administrator</p>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <DashboardIcon />
            {sidebarOpen && <span>Overview</span>}
          </button>
         
          <button
            className={`nav-item ${activeTab === 'turfs' ? 'active' : ''}`}
            onClick={() => setActiveTab('turfs')}
          >
            <TurfIcon />
            {sidebarOpen && <span>Manage Turfs</span>}
          </button>
         
          <button
            className={`nav-item ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <BookingIcon />
            {sidebarOpen && <span>All Bookings</span>}
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item logout-btn" onClick={handleLogout}>
            <LogoutIcon />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <div className="top-bar-left">
            <h1 className="page-title">
              {activeTab === 'overview' && 'Dashboard Overview'}
              {activeTab === 'turfs' && 'Turf Management'}
              {activeTab === 'bookings' && 'Booking Management'}
            </h1>
          </div>
          <div className="top-bar-right">
            <div className="user-profile">
              <span className="welcome-text">Welcome back, {user?.fullName}</span>
              <div className="user-avatar small">
                <UserIcon />
              </div>
            </div>
          </div>
        </header>

        <div className="content-wrapper">
          {/* Stats Cards - Only show on overview */}
          {activeTab === 'overview' && (
            <div className="stats-grid">
              <div className="stat-card revenue">
                <h3>Total Revenue</h3>
                <div className="stat-value">₹{stats.revenue.toLocaleString()}</div>
                <div className="stat-trend">+12% from last month</div>
              </div>
             
              <div className="stat-card bookings">
                <h3>Total Bookings</h3>
                <div className="stat-value">{stats.totalBookings}</div>
                <div className="stat-trend">{stats.confirmedBookings} confirmed</div>
              </div>
             
              <div className="stat-card turfs">
                <h3>Active Turfs</h3>
                <div className="stat-value">{turfs.length}</div>
                <div className="stat-trend">All operational</div>
              </div>
             
              <div className="stat-card pending">
                <h3>Pending</h3>
                <div className="stat-value">{stats.pendingBookings}</div>
                <div className="stat-trend">Awaiting confirmation</div>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className="content-card">
            {loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading data...</p>
              </div>
            ) : (
              <>
                {activeTab === 'turfs' && (
                  <div className="turfs-section">
                    <div className="section-header">
                      <div className="header-content">
                        <h2>Turf Management</h2>
                        <p className="section-subtitle">Manage all your sports turfs from here</p>
                      </div>
                      <button
                        onClick={() => setShowTurfForm(true)}
                        className="btn btn-primary btn-with-icon"
                      >
                        <AddIcon />
                        Add New Turf
                      </button>
                    </div>

                    <div className="turfs-grid">
                      {turfs.map((turf) => (
                        <div key={turf.id} className="turf-card">
                          <div className="turf-image">
                            <div className="image-placeholder">
                              {turf.sportsType.split(',')[0]}
                            </div>
                          </div>
                          <div className="turf-content">
                            <div className="turf-header">
                              <h3>{turf.name}</h3>
                              <span className="price-tag">₹{turf.pricePerHour}/hr</span>
                            </div>
                            <p className="turf-location">{turf.location}</p>
                           
                            <div className="turf-details">
                              <div className="detail-item">
                                <span className="detail-label">Sports:</span>
                                <span className="detail-value">{turf.sportsType}</span>
                              </div>
                              <div className="detail-item">
                                <span className="detail-label">Capacity:</span>
                                <span className="detail-value">{turf.capacity} people</span>
                              </div>
                              <div className="detail-item">
                                <span className="detail-label">Timing:</span>
                                <span className="detail-value">{turf.availableFrom} - {turf.availableTo}</span>
                              </div>
                            </div>
                           
                            <div className="turf-actions">
                              <button
                                onClick={() => handleEditTurf(turf)}
                                className="btn btn-edit btn-icon"
                              >
                                <EditIcon />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteTurf(turf.id)}
                                className="btn btn-delete btn-icon"
                              >
                                <DeleteIcon />
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {turfs.length === 0 && (
                      <div className="empty-state">
                        <div className="empty-icon">🏟️</div>
                        <h3>No turfs available</h3>
                        <p>Add a new turf to get started with bookings</p>
                        <button
                          onClick={() => setShowTurfForm(true)}
                          className="btn btn-primary"
                        >
                          <AddIcon />
                          Add Your First Turf
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'bookings' && (
                  <div className="bookings-section">
                    <div className="section-header">
                      <div className="header-content">
                        <h2>Booking Management</h2>
                        <p className="section-subtitle">View and manage all bookings</p>
                      </div>
                    </div>

                    <div className="table-container">
                      {bookings.length > 0 ? (
                        <table className="bookings-table">
                          <thead>
                            <tr>
                              <th>Booking ID</th>
                              <th>Customer</th>
                              <th>Turf</th>
                              <th>Date & Time</th>
                              <th>Duration</th>
                              <th>Amount</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bookings.map((booking) => (
                              <tr key={booking.id}>
                                <td className="booking-id">#{booking.id}</td>
                                <td>
                                  <div className="customer-cell">
                                    <div className="customer-avatar">
                                      {booking.customerName?.charAt(0) || 'C'}
                                    </div>
                                    <span>{booking.customerName}</span>
                                  </div>
                                </td>
                                <td>{booking.turfName}</td>
                                <td>
                                  <div className="datetime-cell">
                                    <div className="date">{booking.bookingDate}</div>
                                    <div className="time">{booking.startTime} - {booking.endTime}</div>
                                  </div>
                                </td>
                                <td>{booking.totalHours} hours</td>
                                <td className="amount">₹{booking.totalPrice}</td>
                                <td>
                                  <span className={`status-badge status-${booking.status.toLowerCase()}`}>
                                    {booking.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className="empty-state">
                          <div className="empty-icon">📅</div>
                          <h3>No bookings yet</h3>
                          <p>Bookings will appear here once customers start booking</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'overview' && (
                  <div className="overview-section">
                    <div className="section-header">
                      <h2>Quick Actions</h2>
                    </div>
                    <div className="quick-actions">
                      <button
                        className="quick-action-btn"
                        onClick={() => {
                          setActiveTab('turfs');
                          setShowTurfForm(true);
                        }}
                      >
                        <AddIcon />
                        <span>Add New Turf</span>
                      </button>
                      <button
                        className="quick-action-btn"
                        onClick={() => setActiveTab('bookings')}
                      >
                        <BookingIcon />
                        <span>View Bookings</span>
                      </button>
                    </div>
                   
                    <div className="recent-bookings">
                      <h3>Recent Bookings</h3>
                      {bookings.slice(0, 5).map(booking => (
                        <div key={booking.id} className="recent-booking">
                          <div className="recent-booking-info">
                            <strong>{booking.customerName}</strong>
                            <span>{booking.turfName}</span>
                            <span>{booking.bookingDate}</span>
                          </div>
                          <span className={`status-badge status-${booking.status.toLowerCase()}`}>
                            {booking.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {showTurfForm && (
        <TurfForm
          turf={editingTurf}
          onClose={handleTurfFormClose}
          userId={user?.id}
        />
      )}
    </div>
  );
};

export default AdminDashboard;