import { Injectable } from '@angular/core';
import { CommService } from './comm.service';
import { LoginRequest } from '../DTO/Requests/login-request';
import { Observable, Subject } from 'rxjs';
import { User } from '../DTO/Models/user';
import { LoginResponseOK } from '../DTO/Responses/login-response-ok';
import { ResponseError } from '../DTO/Responses/response-error';
import { map } from 'rxjs/operators';
import { LoginResponseUserNotExists } from '../DTO/Responses/login-response-user-not-exists';
import { WsService } from './ws.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUser:User
  userNameSubject = new Subject<{
    isLoggedIn: boolean;
    user: User;
  }>()
 isLogedIn:boolean=false

  ResponseSubjects:{[responseID:string]:Subject<any>}={
    LoginResponseOK:new Subject<LoginResponseOK>(),
    ResponseError:new Subject<ResponseError>(),
    LoginResponseUserNotExists:new Subject<LoginResponseUserNotExists>()
  }

  constructor(private commService:CommService,private wsService:WsService) { }
  Login(request:LoginRequest){
    return this.commService.Login(request).
    pipe(map(data=>[data,this.ResponseSubjects[data.responseType]])).
    subscribe(
      ([data,subject])=>subject?.next(data),
    )
  }

  get onLoginOK(){
    return this.ResponseSubjects.LoginResponseOK as Subject<LoginResponseOK>
  }
  get onResponseError(){
    return this.ResponseSubjects.ResponseError
  }
  get onUserNotExists(){
    return this.ResponseSubjects.LoginResponseUserNotExists
  }

  getCurrentUser():User{
    return this.currentUser
  }

  setCurrentUser(user:User,isLoggedIn:boolean){
    if(!isLoggedIn){
      this.wsService.ConnectOrDisconnect(user.emailAddress,"disconnection")
      this.currentUser=null
    }
    else{
      this.currentUser=user
    }
    this.isLogedIn=isLoggedIn
    this.userNameSubject.next({isLoggedIn:this.isLogedIn,user:this.currentUser})
  }
  

  onLogin(): Observable<{
    isLoggedIn: boolean;
    user: User;
  }> {
    return this.userNameSubject
  }
}
