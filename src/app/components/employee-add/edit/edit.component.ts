import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
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
    private _dialog: DialogRef<EmployeeService>
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

  getAllData() {
    if (this.employeeForm.valid) {
      this._employeeService.addEmployee(this.employeeForm.value).subscribe({
        next: (val: any) => {
          alert('You have added successfully');
          this._dialog.close();
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }
}
