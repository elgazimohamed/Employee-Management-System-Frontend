import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/Models/employee.model';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
      console.log(this.employees);
    });
  }

  addEmployee(): void {
    this.router.navigate(['/add-employee']);
  }

  editEmployee(employee: Employee): void {
    if (!employee.id) {
      console.error('Employee ID is undefined', employee); // Debugging line
      return;
    }
    this.router.navigate(['/edit-employee', employee.id]);
  }

  deleteEmployee(id: string): void {
    if (confirm(`Are you sure you want to delete this employee?`)) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: (response) => {
          // Remove the deleted employee from the UI
          this.toastr.success(response.message);
          this.loadEmployees();
        },
        error: (error) => {
          this.toastr.error(error);
        },
      });
    }
  }

  viewEmployeeDetails(employee: Employee): void {
    if (!employee.id) {
      console.error('Employee ID is undefined', employee); // Debugging line
      return;
    }
    this.router.navigate(['/view-employee', employee.id]);
  }
}
