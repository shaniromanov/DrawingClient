import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { RemoveDocumentService } from '../services/remove-document.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-delete-document',
  templateUrl: './delete-document.component.html',
  styleUrls: ['./delete-document.component.css']
})
export class DeleteDocumentComponent implements OnInit {

  @Output() deletedDoc:EventEmitter<any>
  @Input() docId:string
  constructor(private removeDocumentService:RemoveDocumentService) {
    this.deletedDoc=new EventEmitter<any>()

   }

  ngOnInit(): void {
    this.removeDocumentService.onRemoveDocumentOK.subscribe(data=>{})
    this.removeDocumentService.onResponseError.subscribe(data=>
      console.log("error",data))
  }
  RemoveDocument(docId:string){
    this.removeDocumentService.RemoveDocument({DocId:this.docId})
    this.deletedDoc.next()
  }
}
