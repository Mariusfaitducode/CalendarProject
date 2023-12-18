using System;
using System.Collections.Generic;

namespace OvenManagerBackend2.Model;

public partial class Reservation
{
    public int Id { get; set; }

    public int? IdOven { get; set; }

    public int? IdTest { get; set; }

    public virtual Oven? IdOvenNavigation { get; set; }

    public virtual Test? IdTestNavigation { get; set; }

    public virtual ICollection<PropertyReservation> PropertyReservations { get; set; } = new List<PropertyReservation>();
}
