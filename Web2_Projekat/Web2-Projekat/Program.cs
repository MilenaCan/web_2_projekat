using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Web2_Projekat.Data;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<Web2_ProjekatContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Web2_ProjekatContext") ?? throw new InvalidOperationException("Connection string 'Web2_ProjekatContext' not found.")));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
