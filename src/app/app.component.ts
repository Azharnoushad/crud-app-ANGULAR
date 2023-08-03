import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from './components/employee-add/edit/edit.component';
import { EmployeeService } from './services/employee.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'crud_app';

  // table========================================================================
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // table========================================================================

  ngOnInit() {
    this.getEmployeeList();
  }

  constructor(
    private _dialog: MatDialog,
    private _employeeService: EmployeeService
  ) {}

  openEditEmployee() {
    const dialogref = this._dialog.open(EditComponent, {
      width: '500px',
    });
    dialogref.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }

  getEmployeeList() {
    this._employeeService.getAllEmployeeDetails().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteEmployeeDetails(id: number) {
    this._employeeService.deleteEmployeeDetails(id).subscribe({
      next: (res) => {
        alert('Emplyee deleted');
        this.getEmployeeList();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  editEmployee(data: any) {
    this._dialog.open(EditComponent, {
      width: '500px',
      data: data,
    });
  }
}
