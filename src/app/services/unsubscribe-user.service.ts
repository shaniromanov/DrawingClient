import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ResponseError } from '../DTO/Responses/response-error';
import { RemoveUserResponseOK } from '../DTO/Responses/remove-user-response-ok';
import { CommService } from './comm.service';
import { RemoveUserRequest } from '../DTO/Requests/remove-user-request';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UnsubscribeUserService {
  ResponseSubjects:{[responseID:string]:Subject<any>}={
    RemoveUserResponseOK:new Subject<RemoveUserResponseOK>(),
    ResponseError:new Subject<ResponseError>()
  }
  constructor(private commService:CommService) { }

  RemoveUser(request:RemoveUserRequest){
    return this.commService.RemoveUser(request).
    pipe(map(data=>[data,this.ResponseSubjects[data.responseType]])).
    subscribe(
      ([data,subject])=>subject?.next(data),
    )
  }

  get onRemoveUserOK(){
    return this.ResponseSubjects.RemoveUserResponseOK
  }
  get onResponseError(){
    return this.ResponseSubjects.ResponseError
  }
}
