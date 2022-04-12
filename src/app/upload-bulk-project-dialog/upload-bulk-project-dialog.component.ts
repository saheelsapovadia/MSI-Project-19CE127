import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-upload-bulk-project-dialog',
  templateUrl: './upload-bulk-project-dialog.component.html',
  styleUrls: ['./upload-bulk-project-dialog.component.css']
})
export class UploadBulkProjectDialogComponent implements OnInit {

  constructor(private _backend : BackendService, private dialogRef : MatDialogRef<UploadBulkProjectDialogComponent>, private _snackBar: MatSnackBar) { }

  uploadedFiles !:Array<File> ;
  fileName = '';
  ngOnInit(): void {
  }
  uploadBulkProject(){

  }
  onFileSelected(event:any) {

        const file:File = event.target.files[0];

        if (file) {
            this.fileName = file.name;
            const formData = new FormData();
            formData.append("files", file);
            console.log()
            this._backend.uploadBulkProject(formData).subscribe((data) => {
            })
        }
    }
     fileChange(element:any) {
        this.uploadedFiles = element.target.files;
        this.fileName = this.uploadedFiles[0].name;
    }
    upload() {
        let formData = new FormData();
        for (var i = 0; i < this.uploadedFiles.length; i++) {
            formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
        }
        this._backend.uploadBulkProject(formData).subscribe((data:any) => {
          console.log(data)
          if(data){
             this._snackBar.open(data.message, "Cancel", {
  duration: 2500
});
this.dialogRef.close()
          }
            })
    }

}
