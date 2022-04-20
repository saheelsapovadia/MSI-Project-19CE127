import { Inject, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ContentObserver } from '@angular/cdk/observers';
import { _MatSnackBarBase } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BackendService } from '../backend.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent implements OnInit {
  projectForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private _backend: BackendService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}
  update:Boolean = true;
  actionBtn: string = 'Save';
  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      projectName: [],
      departmentCode: [],
      users: [],
      product: [],
      status: [],
      cieAreaId: [],
      financeProductId: [],
      //Add validators for all the fields
    });
    
    console.log(this.editData);
    if (this.editData) {
      console.log("oninit Updating")
      this.actionBtn = 'Confirm';
      this.projectForm.controls['projectName'].setValue(
        this.editData.projectname
      );
      this.projectForm.controls['departmentCode'].setValue(
        this.editData.deptcode
      );
      this.projectForm.controls['users'].setValue(this.editData.users);
      this.projectForm.controls['product'].setValue(this.editData.product);
      this.projectForm.controls['status'].setValue(this.editData.status);
      this.projectForm.controls['cieAreaId'].setValue(this.editData.cieareaid);
      this.projectForm.controls['financeProductId'].setValue(
        this.editData.financeproductid
      );
    }else{
      console.log("Save")
    }
  }

  test(){
    if(this.editData){
      console.log('update')
      this.updateProject();
    }else{
      console.log('add')
      this.addProject()
    }
  }

  addProject() {
      console.log('adding function')
      console.log(this.projectForm.value);
      let response = this._backend
      .addProject(this.projectForm.value)
      .subscribe((data: any) => {
        console.log('subscribed data', data);
        this._snackBar.open(data.body.message, 'Cancel', {
          duration: 2500,
        });
        this.projectForm.reset();
        this.dialogRef.close('save');
        return data;
      });
      console.log('add project response', response);
    }
    
  updateProject(){
    console.log('updating function')
    console.log(this.projectForm.value);
    let response = this._backend
      .updateProject(this.projectForm.value, this.editData.id)
      .subscribe((data: any) => {
        console.log('subscribed data', data);
        this._snackBar.open(data.body.message, 'Cancel', {
          duration: 2500,
        });
        this.projectForm.reset();
        this.dialogRef.close('update');
        this.actionBtn = "Save"
        return data;
      });
    console.log('update project response', response);
  }
}
