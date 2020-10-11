import { Component, OnInit, Inject,AfterViewInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateDocumentService } from '../services/create-document.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialDialogComponent } from '../material-dialog/material-dialog.component';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.css']
})
export class CreateDocumentComponent implements OnInit {

  userId:string
  createDocumentForm:FormGroup
  dialogData: any;

  get DocumentName() { return this.createDocumentForm.get('DocumentName'); }

  constructor(public dialog: MatDialog ,private loginService:LoginService,private createDocumentService:CreateDocumentService,private router:Router) {
   }

  ngOnInit(): void {
    
    this.createDocumentService.onCreateDocumentOK.subscribe(res=>
     {this.openDialog(true)
      this.dialog.afterAllClosed.subscribe(data=>
        this.router.navigate(['/documents-list'] )
      )
     }
   )
 
      
    this.createDocumentService.onResponseError.subscribe(error=> {
   
      this.openDialog(false)
    })

    this.userId=this.loginService.getCurrentUser()?.emailAddress

    this.createDocumentForm = new FormGroup(
      {
      OwnerId:new FormControl(this.userId),
      DocumentName:new FormControl('',[Validators.required])
       })
  }

  createDocument(){
    if(this.createDocumentForm.valid){
      this.createDocumentService.CreateDocument(this.createDocumentForm.value)
     }
     else  return
  }

openDialog(isOK:boolean): void {
  const dialogRef = this.dialog.open(MaterialDialogComponent, {
    width: '350px',
    data: {
      title:  'Create Document: '    ,
      content:  isOK ? 'Document Created successfully' :'Some error is apeared, please try later.',
      okBtn: { value: 'OK' }
    }
  })
  
}
}
