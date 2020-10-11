import { Injectable } from '@angular/core';
import { CommService } from './comm.service';
import { Subject } from 'rxjs';
import { ResponseError } from '../DTO/Responses/response-error';
import { GetReciversOfDocumentResponseOK } from '../DTO/Responses/get-recivers-of-document-response-ok';
import { GetReciversOfDocumentRequest } from '../DTO/Requests/get-recivers-of-document-request';
import { map } from 'rxjs/operators';
import { DocumentSharingRequest } from '../DTO/Requests/document-sharing-request';

@Injectable({
  providedIn: 'root'
})
export class ReciversOfDocumentService {
  
  ResponseSubjects:{[responseID:string]:Subject<any>}={
    GetReciversOfDocumentResponseOK:new Subject<GetReciversOfDocumentResponseOK>(),
    ResponseError:new Subject<ResponseError>()
  }
  constructor(private commService:CommService) { }

  GetReciversOfDocument(request:GetReciversOfDocumentRequest){
    return this.commService.GetReciversOfDocument(request).
    pipe(map(data=>[data,this.ResponseSubjects[data.responseType]])).
    subscribe(
      ([data,subject])=>subject?.next(data),
    )
  }
  DocumentSharing(request:DocumentSharingRequest ){
    console.log("DocumentSharing",request)
   return this.commService.DocumentSharing(request)

  }
  StopDocumentSharing(request:DocumentSharingRequest ){
    console.log("StopDocumentSharing")
    return this.commService.StopDocumentSharing(request)
 
  }

  get onGetReciversOfDocumentOK(){
    return this.ResponseSubjects.GetReciversOfDocumentResponseOK as Subject<GetReciversOfDocumentResponseOK>
  }
  get onResponseError(){
    return this.ResponseSubjects.ResponseError as Subject<ResponseError>
  }
}
