using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace OvenManagerBackend2.Model;

public partial class Test
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? TemperatureMin { get; set; }

    public string? TemperatureMax { get; set; }

    public string? entity { get; set; }

    [JsonIgnore]
    public virtual ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
}
