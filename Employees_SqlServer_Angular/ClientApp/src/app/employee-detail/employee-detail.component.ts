import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Employee } from "../employees/employee";
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  //@Input() employee: Employee;
  employee: Employee;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.getEmployee();
  }

  getEmployee(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.employeeService.getEmployee(id)
      .subscribe(employee => this.employee = employee);
  }

  updateEmployee(){
    if(!isNaN(Number(this.employee.salary))){
      this.employee.salary = Number(this.employee.salary);

      this.update();
    } else{
        console.log("salary error:", this.employee.salary);
    }
  }

  update(){
    this.employeeService.updateEmployee(this.employee)
    //.subscribe(employee => this.employee = employee);
    .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
