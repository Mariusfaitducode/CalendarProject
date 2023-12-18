using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace OvenManagerBackend2.Model;

public partial class Property
{
    public int Id { get; set; }

    public int? IdOven { get; set; }

    public string? Name { get; set; }

    public string? Value { get; set; }

    [JsonIgnore]
    public virtual Oven? IdOvenNavigation { get; set; }
}
