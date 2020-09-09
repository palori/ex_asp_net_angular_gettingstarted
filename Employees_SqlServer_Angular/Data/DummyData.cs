using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Employees_SqlServer.Models;

namespace Employees_SqlServer.Data
{
    public class DummyData
    {
        public static void Initialize(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<EmployeesContext>();
                context.Database.EnsureCreated();
                //context.Database.Migrate();

                // Look for any employees
                if (context.Employees != null && context.Employees.Any())
                    return;   // DB has already been seeded

                var employees = GetEmployees().ToArray();
                context.Employees.AddRange(employees);
                context.SaveChanges();
            }
        }

        public static List<Employee> GetEmployees()
        {
            List<Employee> employees = new List<Employee>() {
                new Employee {Name="Leonard", Surname="Hofstadter", Job="Physicist", Salary=2000},
                new Employee {Name="Sheldon", Surname="Cooper", Job="Physicist", Salary=2500},
                new Employee {Name="Rajesh", Surname="Koothrappali", Job="Astro-physicist", Salary=2000},
                new Employee {Name="Howard", Surname="Wolowitz", Job="Engineer", Salary=1800},
            };
            return employees;
        }

        
    }
}
