import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Observable, Subject, concat, merge, forkJoin } from 'rxjs';
import { CommService } from './comm.service';
import { map, debounceTime, take, switchMap, tap } from 'rxjs/operators';
import { RegisterUserRequest } from '../DTO/Requests/register-user-request';
import { ValidateUserRequest } from '../DTO/Requests/validate-user-request';
import { CreateUserResponseOK } from '../DTO/Responses/create-user-response-ok';
import { ResponseError } from '../DTO/Responses/response-error';
import { ValidateUserResponseOK } from '../DTO/Responses/validate-user-response-ok';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  
  ResponseSubjects:{[responseID:string]:Subject<any>}={
    CreateUserResponseOK:new Subject<CreateUserResponseOK>(),
    ResponseError:new Subject<ResponseError>()
  }
  
  constructor(private commService:CommService) { }

  RegisterUser(request:RegisterUserRequest){
    return this.commService.RegisterUser(request).
    pipe(map(data=>[data,this.ResponseSubjects[data.responseType]])).
    subscribe(
      ([data,subject])=>subject?.next(data),
    )
  }

  get onRegisterUserOK(){
    return this.ResponseSubjects.CreateUserResponseOK
  }
  get onResponseError(){
    return this.ResponseSubjects.ResponseError
  }

  ValidateUser(validateUserRequest: ValidateUserRequest): Observable<ValidationErrors|null> {
    let mappedCommResponse= this.commService.validateUser(validateUserRequest).pipe(
   
      map((response):ValidationErrors=>{
        let retval
        if(response.responseType=="ValidateUserResponseOK"){
          response.userNotExists?retval=null:retval= {usernameExists:true}
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
