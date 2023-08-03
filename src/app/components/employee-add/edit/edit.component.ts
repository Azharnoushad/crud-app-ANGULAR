import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  educations: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  employeeForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _employeeService: EmployeeService,
    private _dialog: MatDialogRef<EmployeeService>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.employeeForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
  }
  ngOnInit(): void {
    this.employeeForm.patchValue(this.data);
  }

  getAllData() {
    if (this.employeeForm.valid) {
      if (this.data) {
        this._employeeService
          .updateEmployeeDetails(this.data.id, this.employeeForm.value)
          .subscribe({
            next: (val: any) => {
              alert('Employee details is updated successfully');
              this._dialog.close(true);
            },
            error: (err) => {
              console.log(err);
            },
          });
      } else {
        this._employeeService.addEmployee(this.employeeForm.value).subscribe({
          next: (val: any) => {
            alert('You have added successfully');
            this._dialog.close(true);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      }
    }
  }
}
