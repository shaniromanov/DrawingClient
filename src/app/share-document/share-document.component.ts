import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ShareDocumentService } from '../services/share-document.service';
import { MatDialog } from '@angular/material/dialog';
import { MaterialDialogComponent } from '../material-dialog/material-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-share-document',
  templateUrl: './share-document.component.html',
  styleUrls: ['./share-document.component.css']
})
export class ShareDocumentComponent implements OnInit {

  ShareForm: FormGroup
  docId:string

  constructor(private router:Router,private route: ActivatedRoute,  public dialog: MatDialog,private shareDocumentService:ShareDocumentService) { }

  ngOnInit(): void {

    this.shareDocumentService.onShareDocumentOK.subscribe(res=>{this.openDialog(true)
      this.dialog.afterAllClosed.subscribe(data=>
        this.router.navigate(['/documents-list'] )
      )
    })
    this.shareDocumentService.onResponseError.subscribe(error=>this.openDialog(false))
    this.docId=this.route.snapshot.paramMap.get('id')
    this.ShareForm = new FormGroup( {
      UserId:new FormControl('',[Validators.email,Validators.required],this.ValidateEmailInServer()),
      DocId:new FormControl(this.docId)
    })
  }

  get UserId() { return this.ShareForm.get('UserId'); }

  openDialog(isOK): void {
    const dialogRef = this.dialog.open(MaterialDialogComponent, {
      width: '350px',
      data: {
        title:  'Share Document: '    ,
        content: isOK ? 'The document shared successfully' : 'Operation failed',
        okBtn: { value: 'OK' }
      }
    })
 
  }
  Share(){
     if(this.ShareForm.valid){
      this.shareDocumentService.CreateShare(this.ShareForm.value)
     }
     else return
  }

  ValidateEmailInServer():AsyncValidatorFn{
    return (control:AbstractControl):Observable<ValidationErrors|null>=>{
      return this.shareDocumentService.ValidateUser({"EmailAddress":control.value})
    
    }
  }
}
