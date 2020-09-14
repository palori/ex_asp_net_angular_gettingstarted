import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Employee } from "../employees/employee";
import { EmployeeService } from '../employee.service';
import { rawListeners } from 'process';
import { INITIAL_CONFIG } from '@angular/platform-server';

@Component({
  selector: 'app-employee-add-new',
  templateUrl: './employee-add-new.component.html',
  styleUrls: ['./employee-add-new.component.css']
})
export class EmployeeAddNewComponent implements OnInit {

  errorName: boolean;
  errorSurname: boolean;
  errorJob: boolean;
  errorSalary: boolean;
  salary: number = 0;

  constructor(
    private employeeService: EmployeeService,
    private location: Location
  ) {}

  ngOnInit() { }

  initEmployee(n:string, sn:string, j:string, sy:number){
    return {
      name: n,
      surname: sn,
      job: j,
      salary: sy
    };
  }

  addEmployee(name: string, surname: string, job: string, salary: string){
    this.clearData();
    // verify inputs
    name = name.trim();
    if (!name) { this.errorName = true; }

    surname = surname.trim();
    if (!surname) { this.errorSurname = true; }

    job = job.trim();
    if (!job) { this.errorJob = true; }

    salary = salary.trim();
    if(!isNaN(Number(salary))){
      this.salary = Number(salary);
    } else{
        this.errorSalary = true;
    }

    // add employee
    if(!this.isError()){
      this.employeeService.addEmployee(this.initEmployee(name,surname,job,this.salary) as Employee)
      //.subscribe(employee => this.employee = employee);
      .subscribe(() => this.goBack());
      //.subscribe();
    }
  }

  goBack(): void {
    this.location.back();
  }

  clearData(): void{
    this.errorName = false;
    this.errorSurname = false;
    this.errorJob = false;
    this.errorSalary = false;
    // clear employee values?
  }

  isError(): boolean{
    return this.errorName||this.errorSurname||this.errorJob||this.errorSalary;
  }

}
