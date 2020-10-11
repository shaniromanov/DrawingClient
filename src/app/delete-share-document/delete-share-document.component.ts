import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { take } from 'rxjs/operators';
import { RemoveShareDocumentService } from '../services/remove-share-document.service';

@Component({
  selector: 'app-delete-share-document',
  templateUrl: './delete-share-document.component.html',
  styleUrls: ['./delete-share-document.component.css']
})
export class DeleteShareDocumentComponent implements OnInit {

  @Output() deletedDoc:EventEmitter<any>
  @Input() docId:string
  @Input() userId:string
  constructor(private removeShareDocumentService:RemoveShareDocumentService) {
    this.deletedDoc=new EventEmitter<any>()

   }

  ngOnInit(): void {
    
    this.removeShareDocumentService.onRemoveDocumentOK.subscribe(data=>{
      console.log("onRemoveDocumentOK",data)})
    this.removeShareDocumentService.onResponseError.subscribe(data=>
      console.log("error",data))
  }
  RemoveShareDocument(docId:string){
    console.log("click")
    this.removeShareDocumentService.RemoveShareDocument({DocId:docId,UserId:this.userId})
    this.deletedDoc.next()
  }
}
