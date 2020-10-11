import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UploadImageService } from '../services/upload-image.service';
import { MatDialog } from '@angular/material/dialog';
import { MaterialDialogComponent } from '../material-dialog/material-dialog.component';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  @Input() docId:string
  @Output() imageUrl:EventEmitter<string>
  fileUploadedName:string

  constructor(public dialog: MatDialog,private uploadImageService:UploadImageService) { 
    this.imageUrl=new EventEmitter<string>()
  }

  ngOnInit(): void {
    this.uploadImageService.onUploadImageOK.subscribe(res=>{
      console.log("loginResponseOk",res)
      this.imageUrl.emit(res.imageUrl)
  })
  this.uploadImageService.onResponseError.subscribe(error=>this.openDialog())
  }

  uploadImage(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.fileUploadedName = file.name;
    const formData = new FormData();
    formData.append('Image', file, file.name);
    formData.append('DocId',this.docId)
    this.uploadImageService
      .uploadImage(formData)
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(MaterialDialogComponent, {
      width: '350px',
      data: {
        title:  'Upload Image: '    ,
        content: 'Some error is apeared, please try later.',
        okBtn: { value: 'OK' }
      }
    });
  }
}
