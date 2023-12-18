


using Microsoft.EntityFrameworkCore;
using OvenManagerBackend2.Model;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AnyOrigin", builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<OvenDatabaseContext>(options =>
{
    options.UseSqlServer("Server=localhost\\SQLEXPRESS;Database=OvenDatabase;User=sa;password=;Encrypt=false;");
});

//builder.Services.AddControllers().AddJsonOptions(options =>
//{
//    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
//});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AnyOrigin");
app.UseAuthorization();

app.MapControllers();

app.Run();
