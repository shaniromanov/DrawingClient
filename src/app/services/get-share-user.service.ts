import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ResponseError } from '../DTO/Responses/response-error';
import { map, take } from 'rxjs/operators';
import { GetShareUserResponseOK } from '../DTO/Responses/get-share-user-response-ok';
import { GetShareUserRequest } from '../DTO/Requests/get-share-user-request';
import { CommService } from './comm.service';

@Injectable({
  providedIn: 'root'
})
export class GetShareUserService {

  ResponseSubjects:{[responseID:string]:Subject<any>}={
    GetShareUserResponseOK:new Subject<GetShareUserResponseOK>(),
    ResponseError:new Subject<ResponseError>()
  }
  
  constructor(private commService:CommService) { }
  
  GetShareUser(request:GetShareUserRequest){
    return this.commService.GetShareUser(request).
    pipe(map(data=>[data,this.ResponseSubjects[data.responseType]])).
    subscribe(
      ([data,subject])=>subject?.next(data),
    )
  }

  get onGetShareUserOK(){
    return this.ResponseSubjects.GetShareUserResponseOK
  }
  get onResponseError(){
    return this.ResponseSubjects.ResponseError
  }
}
