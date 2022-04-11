import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BackendService } from '../backend.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from '../add-project/add-project.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
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
    'status',
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    this.dialog.open(AddProjectComponent, {
      data: {},
      width: '30%',
    });
  }
}
