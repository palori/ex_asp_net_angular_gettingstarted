import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  
  public employees: Employee[];

  constructor(private heroService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(): void {
    this.heroService.getEmployees()
    .subscribe(employees => this.employees = employees);
  }

  deleteEmployee(employee: Employee){
    this.employees = this.employees.filter(h => h !== employee);
    this.heroService.deleteEmployee(employee).subscribe();
  }
  
  /* Defaultish code

  //constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
  constructor(http: HttpClient) {
    http.get<Employee[]>(this.employeesUrl).subscribe(result => {
      this.employees = result;
    }, error => console.error(error));
  }

  ngOnInit() {
  }
  */
}
