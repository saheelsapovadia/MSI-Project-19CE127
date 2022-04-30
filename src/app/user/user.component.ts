import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BackendService } from '../backend.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from '../add-project/add-project.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddUserComponent } from '../add-user/add-user.component';
export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(private _backend: BackendService, public dialog: MatDialog) {
    this._backend.getUsers().subscribe((data: any) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
    });
  }
  displayedColumns: string[] = ['id', 'username', 'email', 'role', 'action'];
  dataSource!: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  projects: any;
  ngOnInit(): void {
    this._backend.getUsers().subscribe((data: any) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  refreshData() {
    this._backend.getUsers().subscribe((data: any) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  deleteProject(id: any) {
    console.log('deleting', id);
    this._backend.deleteProject(id).subscribe((data: any) => {
      console.log(data);
      this.refreshData();
    });
    this.refreshData();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openAddDialog() {
    this.dialog
      .open(AddUserComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.refreshData();
        }
      });
  }
  openBulkDialog() {
    // this.dialog.open(UploadBulkProjectDialogComponent, {
    //   data: {onSuccess : this.refreshData},
    //   width: '30%',
    // });
  }
  updateUser(row: any) {
    console.log('editing', row);
    const isUpdate = true;
    this.dialog
      .open(AddUserComponent, {
        data: row,
        width: '30%',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'update') {
          console.log('closssss');
          this.refreshData();
        }
      });
  }
  exportBulkProjects() {}
}
