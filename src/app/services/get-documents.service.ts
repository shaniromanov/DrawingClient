import { Injectable } from '@angular/core';
import { CommService } from './comm.service';
import { GetDocumentsRequest } from '../DTO/Requests/get-documents-request';
import { Observable, Subject } from 'rxjs';
import { ResponseError } from '../DTO/Responses/response-error';
import { GetDocumentsResponseOK } from '../DTO/Responses/get-documents-response-ok';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetDocumentsService {

  ResponseSubjects:{[responseID:string]:Subject<any>}={
    GetDocumentsResponseOK:new Subject<GetDocumentsResponseOK>(),
    ResponseError:new Subject<ResponseError>()
  }
  
  constructor(private commService:CommService) { }

  GetDocuments(request:GetDocumentsRequest){
    console.log("request",request)
    return this.commService.GetDocuments(request).
    pipe(map(data=>[data,this.ResponseSubjects[data.responseType]])).
    subscribe(
      ([data,subject])=>subject?.next(data),
    )
  }
  get onGetDocumentsOK(){
    return this.ResponseSubjects.GetDocumentsResponseOK
  }
  get onResponseError(){
    return this.ResponseSubjects.ResponseError
  }
}
