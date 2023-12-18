using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace OvenManagerBackend2.Model;

public partial class Oven
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<Property> Properties { get; set; } = new List<Property>();

    [JsonIgnore]
    public virtual ICollection<Reservation>? Reservations { get; set; } = new List<Reservation>();
}
