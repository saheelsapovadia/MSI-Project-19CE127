import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MarvelapiService } from './marvelapi.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon'
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatSnackBarModule} from '@angular/material/snack-bar'
import { HttpTokenInterceptorService } from './http-token-interceptor.service';
import { MatTableModule } from '@angular/material/table'  
import { BottomsheetComponent } from './projectmanagement/projects/bottomsheet/bottomsheet.component';
import { ProjectComponent } from './project/project.component';
import { AddProjectComponent } from './add-project/add-project.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import {MatRadioModule} from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UploadBulkProjectDialogComponent } from './upload-bulk-project-dialog/upload-bulk-project-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    BottomsheetComponent,
    ProjectComponent,
    AddProjectComponent,
    UploadBulkProjectDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     HttpClientModule,
     MatButtonModule,
     FormsModule,
     MatTableModule,
     ReactiveFormsModule,
     MatInputModule,
     MatToolbarModule,
     MatIconModule,
     MatSidenavModule,
     MatListModule,
     BrowserAnimationsModule,
     MatSnackBarModule,
     MatDialogModule,
     MatChipsModule,
     MatRadioModule,
     MatPaginatorModule,
     MatSortModule
  ],
  providers: [MarvelapiService, {
    provide:HTTP_INTERCEPTORS,
    useClass: HttpTokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
