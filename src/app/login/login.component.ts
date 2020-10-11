import { Component, OnInit,OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MaterialDialogComponent } from '../material-dialog/material-dialog.component';
import { Router } from '@angular/router';
import { ReciversOfDocumentService } from '../services/recivers-of-document.service';
import { WsService } from '../services/ws.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  LoginForm: FormGroup


  constructor(private router: Router, public dialog: MatDialog,private loginService:LoginService,private wsService:WsService) { }

  ngOnInit(): void {
    this.loginService.onLoginOK.subscribe(res=>{
        this.loginService.setCurrentUser(res.user,true)
        this.wsService.ConnectOrDisconnect(res.user.emailAddress,"connection")
        this.wsService.onConnection.subscribe(res=>console.log("connection",res))
        this.wsService.onDisconnection.subscribe(res=>console.log("disconnection",res))
        this.router.navigate(['/documents-list/']);
    })
    this.loginService.onResponseError.subscribe(error=>this.openDialog())
  
    this.loginService.onUserNotExists.subscribe(res=>{
     this.LoginForm.setErrors({ 'invalid': true });
  console.log("onUserNotExists")
  console.log(this.LoginForm.invalid)
  })
    this.LoginForm = new FormGroup( {
      EmailAddress:new FormControl('',[Validators.email,Validators.required])})
  }
  Login(){
    if(this.LoginForm.valid){
     this.loginService.Login(this.LoginForm.value)
    }
    else return
 
 }
 get EmailAddress() { return this.LoginForm.get('EmailAddress'); }

 openDialog(): void {
  const dialogRef = this.dialog.open(MaterialDialogComponent, {
    width: '350px',
    data: {
      title:  'Login: '    ,
      content: 'Some error is apeared, please try later.',
      okBtn: { value: 'OK' }
    }
  });
}
}
