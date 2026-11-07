using Serilog;
using Serilog.Core;

namespace SportyverseLogger.Services
{
    public class LoggingService
    {
        private readonly Logger _logger;  // Changed from ILogger to Logger

        public LoggingService()
        {
            _logger = new LoggerConfiguration()
                .WriteTo.Console()
                .WriteTo.File(
                    "logs/sportyverse-.txt",
                    rollingInterval: RollingInterval.Day
                )
                .CreateLogger();
        }

        public void LogInfo(string message, string userInfo = "")
        {
            var logMessage = $"[{DateTime.Now:yyyy-MM-dd HH:mm:ss}] [USER: {userInfo}] {message}";
            _logger.Information(logMessage);
        }

        public void LogError(string message, string userInfo = "", string stackTrace = "")
        {
            var logMessage = $"[{DateTime.Now:yyyy-MM-dd HH:mm:ss}] [USER: {userInfo}] ERROR: {message}";
            if (!string.IsNullOrEmpty(stackTrace))
            {
                logMessage += $"\nStack Trace: {stackTrace}";
            }
            _logger.Error(logMessage);
        }

        public void LogWarning(string message, string userInfo = "")
        {
            var logMessage = $"[{DateTime.Now:yyyy-MM-dd HH:mm:ss}] [USER: {userInfo}] WARNING: {message}";
            _logger.Warning(logMessage);
        }

       public void LogDebug(string message, string userInfo = "")
        {
            var logMessage = $"[{DateTime.Now:yyyy-MM-dd HH:mm:ss}] [USER: {userInfo}] DEBUG: {message}";
            _logger.Debug(logMessage);
        }
    }
}