import { Inject, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { _MatSnackBarBase } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BackendService } from '../backend.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private _backend: BackendService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}
  update: Boolean = true;
  actionBtn: string = 'Save';
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: [],
      email: [],
      password: [],
      role: [],

      //Add validators for all the fields
    });
    if (this.editData) {
      console.log('oninit Updating');
      this.actionBtn = 'Update';
      this.userForm.controls['username'].setValue(this.editData.username);
      this.userForm.controls['email'].setValue(this.editData.email);
      this.userForm.controls['role'].setValue(this.editData.role);
    } else {
      console.log('Save');
    }
  }
  test() {
    if (this.editData) {
      console.log('update');
      this.updateUser();
    } else {
      console.log('add');
      this.addUser();
    }
  }
  addUser() {
    console.log('adding function');
    console.log(this.userForm.value);
    let response = this._backend
      .addUser(this.userForm.value)
      .subscribe((data: any) => {
        console.log('subscribed data', data);
        this._snackBar.open(data.body.message, 'Cancel', {
          duration: 2500,
        });
        this.userForm.reset();
        this.dialogRef.close('save');
        return data;
      });
    console.log('add user response', response);
  }
  updateUser() {}
}
