import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { Employee } from 'src/app/Models/employee.model';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
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
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          if (id) {
            return this.employeeService.getEmployeeById(id).pipe(
              catchError((error) => {
                this.toastr.error(
                  error.error?.message || 'Failed to fetch employee details'
                );
                return of(null);
              })
            );
          }
          throw new Error('Employee ID not provided');
        })
      )
      .subscribe((employee) => {
        if (employee) {
          this.employee = employee;
        }
      });
  }

  updateEmployee(): void {
    this.employeeService.updateEmployee(this.employee).subscribe({
      next: (response: any) => {
        console.log(response);
        this.toastr.success(
          response.message || 'Employee updated successfully.'
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
