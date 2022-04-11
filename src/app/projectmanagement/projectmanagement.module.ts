import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ProjectsComponent } from './projects/projects.component';

import {MatTableModule} from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatBottomSheetModule, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { BottomsheetComponent } from './projects/bottomsheet/bottomsheet.component';
@NgModule({
  declarations: [
    ProjectsComponent,
    // BottomsheetComponent
  ],

  imports: [
    CommonModule,
    MatTableModule,
    MatListModule,
    MatBottomSheetModule
  ],
providers: [
    { provide: MatBottomSheetRef, useValue: {} },
    { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }
  ],
})
export class ProjectmanagementModule { }
