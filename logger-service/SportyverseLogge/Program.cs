var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();

// Enable CORS to allow React app to call this service
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy
            .WithOrigins("http://localhost:3000")  // React app URL
            .AllowAnyMethod()
            .AllowAnyHeader()
    );
});

// Enable API documentation (optional but helpful)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");
app.UseAuthorization();
app.MapControllers();

Console.WriteLine("========================================");
Console.WriteLine("  Sportyverse Logger Service Started");
Console.WriteLine("  Running on: http://localhost:5000");
Console.WriteLine("  API Docs: http://localhost:5000/swagger");
Console.WriteLine("========================================");

app.Run("http://localhost:5000");