using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace OvenManagerBackend2.Model;

public partial class OvenDatabaseContext : DbContext
{
    public OvenDatabaseContext()
    {
    }

    public OvenDatabaseContext(DbContextOptions<OvenDatabaseContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Oven> Ovens { get; set; }

    public virtual DbSet<Property> Properties { get; set; }

    public virtual DbSet<PropertyReservation> PropertyReservations { get; set; }

    public virtual DbSet<Reservation> Reservations { get; set; }

    public virtual DbSet<Test> Tests { get; set; }

    public virtual DbSet<ViewOven> ViewOvens { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=localhost;Initial Catalog=OvenDatabase;Trusted_Connection=True;encrypt=false;User ID=;Password=");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Oven>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Oven__3213E83F02FA16AD");

            entity.ToTable("Oven");

            entity.HasIndex(e => new { e.Id, e.Name }, "NonClusteredIndex-20231207-164303");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Property>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Property__3213E83FA1F48B9B");

            entity.ToTable("Property");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.IdOven).HasColumnName("idOven");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.Value)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("value");

            entity.HasOne(d => d.IdOvenNavigation).WithMany(p => p.Properties)
                .HasForeignKey(d => d.IdOven)
                .HasConstraintName("FK__Property__idOven__5EBF139D");
        });

        modelBuilder.Entity<PropertyReservation>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Property__3213E83FF49F7E53");

            entity.ToTable("PropertyReservation");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.IdReservation).HasColumnName("idReservation");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.Value)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("value");

            entity.HasOne(d => d.IdReservationNavigation).WithMany(p => p.PropertyReservations)
                .HasForeignKey(d => d.IdReservation)
                .HasConstraintName("FK__PropertyR__idRes__41EDCAC5");
        });

        modelBuilder.Entity<Reservation>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Reservat__3213E83FDE672822");

            entity.ToTable("Reservation");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.IdOven).HasColumnName("idOven");
            entity.Property(e => e.IdTest).HasColumnName("idTest");

            entity.HasOne(d => d.IdOvenNavigation).WithMany(p => p.Reservations)
                .HasForeignKey(d => d.IdOven)
                .HasConstraintName("FK__Reservati__idOve__3E1D39E1");

            entity.HasOne(d => d.IdTestNavigation).WithMany(p => p.Reservations)
                .HasForeignKey(d => d.IdTest)
                .HasConstraintName("FK__Reservati__idTes__3F115E1A");
        });

        modelBuilder.Entity<Test>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Test__3213E83FC6F98AAD");

            entity.ToTable("Test");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.TemperatureMax)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("temperatureMax");
            entity.Property(e => e.TemperatureMin)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("temperatureMin");
            entity.Property(e => e.entity)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("entity");
        });

        modelBuilder.Entity<ViewOven>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("View_Oven");

            entity.Property(e => e.OvenName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.PropName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.PropValue)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
