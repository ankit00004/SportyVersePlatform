using Microsoft.AspNetCore.Mvc;
using SportyverseLogger.Models;
using SportyverseLogger.Services;

namespace SportyverseLogger.Controllers
{
    /// <summary>
    /// API Controller that receives log requests from React frontend
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class LogController : ControllerBase
    {
        private readonly LoggingService _loggingService;

        public LogController()
        {
            _loggingService = new LoggingService();
        }

        /// <summary>
        /// POST /api/log/info - Log informational message
        /// </summary>
        [HttpPost("info")]
        public IActionResult LogInfo([FromBody] LogRequest request)
        {
            _loggingService.LogInfo(request.Message, request.UserInfo);
            return Ok(new { status = "success", message = "Info logged" });
        }

        /// <summary>
        /// POST /api/log/error - Log error message
        /// </summary>
        [HttpPost("error")]
        public IActionResult LogError([FromBody] LogRequest request)
        {
            _loggingService.LogError(
                request.Message, 
                request.UserInfo, 
                request.StackTrace ?? ""
            );
            return Ok(new { status = "success", message = "Error logged" });
        }

        /// <summary>
        /// POST /api/log/warning - Log warning message
        /// </summary>
        [HttpPost("warning")]
        public IActionResult LogWarning([FromBody] LogRequest request)
        {
            _loggingService.LogWarning(request.Message, request.UserInfo);
            return Ok(new { status = "success", message = "Warning logged" });
        }

        /// <summary>
        /// POST /api/log/debug - Log debug message
        /// </summary>
        [HttpPost("debug")]
        public IActionResult LogDebug([FromBody] LogRequest request)
        {
            _loggingService.LogDebug(request.Message, request.UserInfo);
            return Ok(new { status = "success", message = "Debug logged" });
        }

        /// <summary>
        /// GET /api/log/test - Test if logger is working
        /// </summary>
        [HttpGet("test")]
        public IActionResult Test()
        {
            _loggingService.LogInfo("Logger service is working!", "SYSTEM");
            return Ok(new { 
                status = "success", 
                message = "Logger is running",
                timestamp = DateTime.Now
            });
        }
    }
}