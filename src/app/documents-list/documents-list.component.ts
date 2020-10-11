import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from '../services/login.service';
import { GetDocumentsService } from '../services/get-documents.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateDocumentComponent } from '../create-document/create-document.component';
import { MaterialDialogComponent } from '../material-dialog/material-dialog.component';
import { Router } from '@angular/router';
import { Document } from '../DTO/Models/Document';
import { WsService } from '../services/ws.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit {

  documents: Array<Document>
  sharedDocuments: Array<Document>
  userId:string
  @ViewChild('userList',{static:false}) userList:ElementRef;
  constructor( private router: Router,public dialog: MatDialog,private loginService:LoginService, private getDocumentsService:GetDocumentsService, private wsService:WsService) { }

  ngOnInit(): void {
    this.wsService.onDocumentDeleted.subscribe(data=>this.getDocumentsService.GetDocuments({OwnerId:this.userId}))
    this.wsService.onSharingDeleted.subscribe(data=>this.getDocumentsService.GetDocuments({OwnerId:this.userId}))
    this.wsService.onSharingAdded.subscribe(data=>this.getDocumentsService.GetDocuments({OwnerId:this.userId}))
    this.getDocumentsService.onGetDocumentsOK.subscribe(res=>{
      console.log("getDocumentsResponseOk",res)
      this.documents=res.myDocuments
      this.sharedDocuments=res.sharedDocuments
      })
    this.getDocumentsService.onResponseError.subscribe(error=> this.openDialog())
    this.userId=this.loginService.getCurrentUser()?.emailAddress
    this.getDocumentsService.GetDocuments({OwnerId:this.userId})
  }
  addDocument(){
    this.router.navigate(['/create-document'] );
  }

  onDeletedDoc(docId:string){
    var index=this.documents.findIndex(doc=>doc.docID==docId)
    if(index!== -1){
      this.documents.splice(index,1)
    }
  }
  onDeletedShareDoc(docId:string){
    var index=this.sharedDocuments.findIndex(doc=>doc.docID==docId)
    if(index!== -1){
      this.sharedDocuments.splice(index,1)
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MaterialDialogComponent, {
      width: '350px',
      data: {
        title:  'Get Documents: '    ,
        content:'Some error is apeared, please try later.',
        okBtn: { value: 'OK' }
      },
        id: 'dialogResponse'
    });
  }

  routeToEditDoc(doc:Document){
    console.log("doc before",doc)
    this.router.navigateByUrl('/document', { state:doc});

  }
  routeToShareDocument(docId:string){
    this.router.navigate(['/share-document/' + docId]);
  }
  routeToShareList(docId:string){
    this.router.navigate(['/get-share-user/'+docId]);
  }
  displayUserList(){
    this.userList.nativeElement.style.display = "block"
  }
}
