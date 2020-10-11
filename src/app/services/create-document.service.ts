import { Injectable } from '@angular/core';
import { CommService } from './comm.service';
import { Subject } from 'rxjs';
import { CreateDocumentRequest } from '../DTO/Requests/create-document-request';
import { ResponseError } from '../DTO/Responses/response-error';
import { CreateDocumentResponseOK } from '../DTO/Responses/create-document-response-ok';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreateDocumentService {

  ResponseSubjects:{[responseID:string]:Subject<any>}={
    CreateDocumentResponseOK:new Subject<CreateDocumentResponseOK>(),
    ResponseError:new Subject<ResponseError>()
  }
  
  constructor(private commService:CommService) { }
  
  CreateDocument(request:CreateDocumentRequest){
    return this.commService.CreateDocument(request).
    pipe(map(data=>[data,this.ResponseSubjects[data.responseType]])).
    subscribe(
      ([data,subject])=>subject?.next(data),
    )
  }

  get onCreateDocumentOK(){
    return this.ResponseSubjects.CreateDocumentResponseOK
  }
  get onResponseError(){
    return this.ResponseSubjects.ResponseError
  }
  
}
