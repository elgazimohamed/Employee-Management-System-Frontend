import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './Components/employee-list/employee-list.component';
import { EditEmployeeComponent } from './Components/edit-employee/edit-employee.component';
import { ViewEmployeeDetailsComponent } from './Components/view-employee-details/view-employee-details.component';
import { AddEmployeeComponent } from './Components/add-employee/add-employee.component';

const routes: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'edit-employee/:id', component: EditEmployeeComponent },
  { path: 'view-employee/:id', component: ViewEmployeeDetailsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
