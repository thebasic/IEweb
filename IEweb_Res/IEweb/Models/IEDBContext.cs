using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace IEweb.Models
{
    public partial class IEDBContext : DbContext
    {
        public IEDBContext()
        {
        }

        public IEDBContext(DbContextOptions<IEDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Expanses> Expanses { get; set; }
        public virtual DbSet<Income> Income { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=DESKTOP-H8HM47K;Database=IEDB;UID=AdminSQL;PWD=2535;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Expanses>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.EDate)
                    .HasColumnName("E_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.EList)
                    .HasColumnName("E_LIST")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Expenses).HasColumnName("EXPENSES");
            });

            modelBuilder.Entity<Income>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.IDate)
                    .HasColumnName("I_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.IList)
                    .HasColumnName("I_LIST")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Income1).HasColumnName("INCOME");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
