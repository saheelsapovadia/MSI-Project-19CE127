import { OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ContentObserver } from '@angular/cdk/observers';
import { _MatSnackBarBase } from '@angular/material/snack-bar';
import {MatSnackBar} from '@angular/material/snack-bar';
import { BackendService } from '../backend.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
 projectForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, private _backend : BackendService, private _snackBar : MatSnackBar, private dialogRef : MatDialogRef<AddProjectComponent>){ 
    
  }
 
  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      projectName : [],
      departmentCode : [],
      users : [],
      product : [],
      status : [],
      cieAreaId : [],
      financeProductId: []
      //Add validators for all the fields
    })
  }
  addProject(){
    console.log(this.projectForm.value)
    let response = this._backend.addProject(this.projectForm.value).subscribe((data:any) => {
      console.log('subscribed data', data);
      this._snackBar.open(data.body.message, "Cancel", {
  duration: 2500
});
this.projectForm.reset();
this.dialogRef.close()
      return data;
    });
    console.log('add project response', response);
  }

}
