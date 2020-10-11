import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ResponseError } from '../DTO/Responses/response-error';
import { RemoveDocumentResponseOK } from '../DTO/Responses/remove-document-response-ok';
import { RemoveDocumentRequest } from '../DTO/Requests/remove-document-request';
import { CommService } from './comm.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RemoveDocumentService {
  
  ResponseSubjects:{[responseID:string]:Subject<any>}={
    RemoveDocumentResponseOK:new Subject<RemoveDocumentResponseOK>(),
    ResponseError:new Subject<ResponseError>()
  }
  constructor(private commService:CommService) { }

  RemoveDocument(request:RemoveDocumentRequest){
    return this.commService.RemoveDocument(request).
    pipe(map(data=>[data,this.ResponseSubjects[data.responseType]])).
    subscribe(
      ([data,subject])=>subject?.next(data),
    )
  }

  get onRemoveDocumentOK(){
    return this.ResponseSubjects.RemoveDocumentResponseOK
  }
  get onResponseError(){
    return this.ResponseSubjects.ResponseError
  }
}
