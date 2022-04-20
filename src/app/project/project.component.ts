import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BackendService } from '../backend.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from '../add-project/add-project.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UploadBulkProjectDialogComponent } from '../upload-bulk-project-dialog/upload-bulk-project-dialog.component';
export interface Project {
  id: number;
  projectname: string;
  deptcode: string;
  // users: string[],
  product: string;
  status: string;
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  constructor(private _backend: BackendService, public dialog: MatDialog) {
    this._backend.getProjects().subscribe((data: any) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
    });
  }
  displayedColumns: string[] = [
    'id',
    'projectname',
    'deptcode',
    'product',
    'users',
    'cieareaid',
    'financeproductid',
    'status',
    'action',
  ];
  dataSource!: MatTableDataSource<Project>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  projects: any;
  ngOnInit(): void {
    this._backend.getProjects().subscribe((data: any) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  refreshData() {
    this._backend.getProjects().subscribe((data: any) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  exportBulkProjects() {
    this._backend.exportBulkProject().subscribe((data: any) => {
      console.log('export', data);
    });
  }
  deleteProject(id: any) {
    console.log('deleting', id);
    this._backend.deleteProject(id).subscribe((data: any) => {
      console.log(data);
      this.refreshData()
    });
    this.refreshData()
  }
 updateProject(row: any) {
    console.log('editing', row);
    const isUpdate = true;
    this.dialog.open(AddProjectComponent, {
      data: row,
      width: '30%',
    }).afterClosed().subscribe(value => {
      if(value === 'update'){
        console.log("closssss")
        this.refreshData()
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddDialog() {
    this.dialog.open(AddProjectComponent, {
      
      width: '30%',
    }).afterClosed().subscribe(value => {
      if(value === 'save'){
        this.refreshData()
      }
    });
  }
  openBulkDialog() {
    this.dialog.open(UploadBulkProjectDialogComponent, {
      data: {onSuccess : this.refreshData},
      width: '30%',
      
    });
  }
}
