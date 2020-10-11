import { Component, OnInit, Input, OnDestroy  } from '@angular/core';
import { ReciversOfDocumentService } from '../services/recivers-of-document.service';
import { WsService } from '../services/ws.service';

@Component({
  selector: 'app-recivers-of-documents',
  templateUrl: './recivers-of-documents.component.html',
  styleUrls: ['./recivers-of-documents.component.css']
})
export class ReciversOfDocumentsComponent implements OnInit ,OnDestroy {

  userList:Array<string>=new Array<string>()
  @Input() docId:string
  @Input() userId:string
  
  constructor(private reciversOfDocumentService: ReciversOfDocumentService,private wsService:WsService) {

   }
 

 
  ngOnInit(): void {
    // this.reciversOfDocumentService.DocumentSharing({DocId:this.docId,UserId:this.userId})
    this.getAsyncRecievers()
    this.wsService.onNewDocumentSharing.subscribe(data=>{
      if(data.docId==this.docId){
        if(this.userList.find(id=>id==data.userId)===undefined){
          this.userList.push(data.userId) }
      }
     })

    this.wsService.onRemoveDocumentSharing.subscribe(data=>{
      const index: number = this.userList.indexOf(data.userId);
      if (index !== -1) {
        this.userList.splice(index, 1);
      } 
    })

    this.reciversOfDocumentService.onGetReciversOfDocumentOK.subscribe(res=> this.userList=res.receivers)
    this.reciversOfDocumentService.onResponseError.subscribe(res=>console.log("error",res))
    // this.reciversOfDocumentService.GetReciversOfDocument({DocId:this.docId})
  }

  async getAsyncRecievers() {
     await  this.reciversOfDocumentService.DocumentSharing({DocId:this.docId,UserId:this.userId}).toPromise()
     this.reciversOfDocumentService.GetReciversOfDocument({DocId:this.docId})
  }
  
  ngOnDestroy(){
    this.reciversOfDocumentService.StopDocumentSharing({DocId:this.docId,UserId:this.userId}).subscribe()
  }

 

}
