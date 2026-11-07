import axios from 'axios';

const LOGGER_API_URL = 'http://localhost:5000/api/log';

class LoggerService {
  
  async logInfo(message, userInfo = null) {
    try {
      await axios.post(`${LOGGER_API_URL}/info`, {  // Fixed: Added (
        message,
        level: 'INFO',
        timestamp: new Date().toISOString(),
        userInfo: userInfo || this.getUserInfo(),
      });
    } catch (error) {
      console.error('Logger service error:', error);
    }
  }

  async logError(message, error = null, userInfo = null) {
    try {
      await axios.post(`${LOGGER_API_URL}/error`, {  // Fixed: Added (
        message: `${message} ${error ? ': ' + error.message : ''}`,
        level: 'ERROR',
        timestamp: new Date().toISOString(),
        userInfo: userInfo || this.getUserInfo(),
        stackTrace: error ? error.stack : null,
      });
    } catch (err) {
      console.error('Logger service error:', err);
    }
  }

  async logWarning(message, userInfo = null) {
    try {
      await axios.post(`${LOGGER_API_URL}/warning`, {  // Fixed: Added (
        message,
        level: 'WARNING',
        timestamp: new Date().toISOString(),
        userInfo: userInfo || this.getUserInfo(),
      });
    } catch (error) {
      console.error('Logger service error:', error);
    }
  }

  async logDebug(message) {
    try {
      await axios.post(`${LOGGER_API_URL}/debug`, {  // Fixed: Added (
        message,
        level: 'DEBUG',
        timestamp: new Date().toISOString(),
        userInfo: this.getUserInfo(),
      });
    } catch (error) {
      console.error('Logger service error:', error);
    }
  }

  getUserInfo() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).username : 'Anonymous';
  }
}

export default new LoggerService();