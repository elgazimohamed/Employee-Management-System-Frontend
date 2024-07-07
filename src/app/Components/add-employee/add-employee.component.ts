import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Models/employee.model';
import { EmployeeService } from 'src/app/Services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent {
  employee: Employee = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    position: '',
    department: '',
  };

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  addEmployee(): void {
    this.employeeService.addEmployee(this.employee).subscribe({
      next: (response: any) => {
        console.log(response);
        this.toastr.success(
          response.message || 'Employee added successfully in the database.'
        );
        this.goBack();
      },
      error: (error: any) => {
        this.toastr.error(error.error);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/employee-list']);
  }
}
