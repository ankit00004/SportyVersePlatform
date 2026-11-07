namespace SportyverseLogger.Models
{
    /// <summary>
    /// Represents a log request from the frontend
    /// </summary>
    public class LogRequest
    {
        // The log message
        public string Message { get; set; } = string.Empty;
        
        // Log level: INFO, ERROR, WARNING, DEBUG
        public string Level { get; set; } = "INFO";
        
        // When the log was created
        public string Timestamp { get; set; } = string.Empty;
        
        // Which user performed the action
        public string UserInfo { get; set; } = string.Empty;
        
        // Additional error details (if any)
        public string? StackTrace { get; set; }
    }
}