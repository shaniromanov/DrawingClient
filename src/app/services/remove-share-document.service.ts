import { Injectable } from '@angular/core';
import { CommService } from './comm.service';
import { Subject } from 'rxjs';
import { ResponseError } from '../DTO/Responses/response-error';
import { RemoveShareResponseOK } from '../DTO/Responses/remove-share-response-ok';
import { RemoveShareRequest } from '../DTO/Requests/remove-share-request';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RemoveShareDocumentService {
  ResponseSubjects:{[responseID:string]:Subject<any>}={
    RemoveDocumentResponseOK:new Subject<RemoveShareResponseOK>(),
    ResponseError:new Subject<ResponseError>()
  }
  constructor(private commService:CommService) { }

  RemoveShareDocument(request:RemoveShareRequest){
    return this.commService.RemoveShare(request).
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
