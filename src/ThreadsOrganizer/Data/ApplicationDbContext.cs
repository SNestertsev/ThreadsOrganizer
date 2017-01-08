using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using OpenIddict.Core;
using OpenIddict.Models;

using ThreadsOrganizer.Data.Items;
using ThreadsOrganizer.Data.Lists;
using ThreadsOrganizer.Data.Users;

namespace ThreadsOrganizer.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        #region Constructor
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }
        #endregion Constructor

        #region Methods
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ApplicationUser>().ToTable("Users");
            modelBuilder.Entity<ApplicationUser>().HasMany(u => u.Lists).WithOne(l => l.Owner);

            modelBuilder.Entity<ThreadList>().ToTable("ThreadLists");
            modelBuilder.Entity<ThreadList>().Property(l => l.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<ThreadList>().HasOne(l => l.Owner).WithMany(u => u.Lists).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<ThreadList>().HasMany(l => l.Items).WithOne(i => i.List);
            modelBuilder.Entity<ThreadList>().HasOne(l => l.DefaultPalette).WithMany().OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Item>().ToTable("Items");
            modelBuilder.Entity<Item>().Property(i => i.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Item>().HasOne(i => i.List).WithMany(l => l.Items).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Item>().HasOne(i => i.Palette).WithMany().OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Palette>().ToTable("Palettes");
            modelBuilder.Entity<Palette>().Property(p => p.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Palette>().HasMany(p => p.Items).WithOne(i => i.Palette);

            modelBuilder.Entity<PaletteItem>().ToTable("PaletteItems");
            modelBuilder.Entity<PaletteItem>().Property(i => i.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<PaletteItem>().HasOne(i => i.Palette).WithMany(p => p.Items).OnDelete(DeleteBehavior.Cascade);
        }
        #endregion Methods

        #region Properties
        public DbSet<OpenIddictApplication> Applications { get; set; }
        public DbSet<ThreadList> Lists { get; set; }
        public DbSet<Palette> Palettes { get; set; }
        #endregion Properties
    }
}
