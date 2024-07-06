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
    id: '',
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
      // console.log();

      next: (response: any) => {
        console.log('Employee added successfully:', response);
        setTimeout(() => {
          this.toastr.success(response.message);
        }, 1000);
        this.goBack();
      },
      error: (error: any) => {
        this.toastr.error(error.error.message);
      },
    });
  }

  goBack(): void {
    // Navigate back to the employee list or desired route
    this.router.navigate(['/employee-list']); // Replace '/employee-list' with your actual employee list route
  }
}
