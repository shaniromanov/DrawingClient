import { Injectable } from '@angular/core';
import { CommService } from './comm.service';
import { ShareDocumentRequest } from '../DTO/Requests/share-document-request';
import { map, debounceTime, take, switchMap } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { ResponseError } from '../DTO/Responses/response-error';
import { CreateShareResponseOK } from '../DTO/Responses/create-share-response-ok';
import { ValidationErrors } from '@angular/forms';
import { ValidateUserRequest } from '../DTO/Requests/validate-user-request';

@Injectable({
  providedIn: 'root'
})
export class ShareDocumentService {

  ResponseSubjects:{[responseID:string]:Subject<any>}={
    CreateShareResponseOK:new Subject<CreateShareResponseOK>(),
    ResponseError:new Subject<ResponseError>()
  }

  constructor(private commService:CommService) { }

  CreateShare(request:ShareDocumentRequest){
    return this.commService.CreateShare(request).
    pipe(map(data=>[data,this.ResponseSubjects[data.responseType]])).
    subscribe(
      ([data,subject])=>subject?.next(data),
    )
  }

  get onShareDocumentOK(){
    return this.ResponseSubjects.CreateShareResponseOK
  }
  get onResponseError(){
    return this.ResponseSubjects.ResponseError
  }

  ValidateUser(validateUserRequest: ValidateUserRequest): Observable<ValidationErrors|null> {
    let mappedCommResponse= this.commService.validateUser(validateUserRequest).pipe(
   
      map((response):ValidationErrors=>{
        let retval
        if(response.responseType=="ValidateUserResponseOK"){
          response.userNotExists?retval={usernameNotExists:true}:retval= null
        }
        else{
          retval={error:true}
        }
        return retval
      }))
      let retval = new Observable<ValidationErrors|null>(subscriber=>subscriber.next())
      retval = retval.pipe(debounceTime(400),take(1),switchMap(value=>mappedCommResponse))
      return retval 
  }
}
