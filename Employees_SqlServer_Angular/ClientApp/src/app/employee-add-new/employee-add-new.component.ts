import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Employee } from "../employees/employee";
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-add-new',
  templateUrl: './employee-add-new.component.html',
  styleUrls: ['./employee-add-new.component.css']
})
export class EmployeeAddNewComponent implements OnInit {

  employee: Employee;

  constructor(
    private employeeService: EmployeeService,
    private location: Location
  ) {}

  ngOnInit() {
  }

  addEmployee(){
    this.employeeService.updateEmployee(this.employee)
    //.subscribe(employee => this.employee = employee);
    .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
