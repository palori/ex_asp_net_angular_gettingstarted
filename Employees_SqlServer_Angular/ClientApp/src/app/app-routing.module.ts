import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeAddNewComponent } from './employee-add-new/employee-add-new.component';

const routes: Routes = [
  // static routes
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'employees', component: EmployeesComponent },
  { path: 'employee/add', component: EmployeeAddNewComponent },
  // other
  { path: 'employee/:id', component: EmployeeDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
