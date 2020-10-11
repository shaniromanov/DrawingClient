import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { RegisterUserService } from '../services/register-user.service';
import { MatDialog } from '@angular/material/dialog';
import { MaterialDialogComponent } from '../material-dialog/material-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  registerUserForm: FormGroup
  
  constructor( public dialog: MatDialog,private registerUserService:RegisterUserService, private router: Router) { 

  }
  ngOnInit() {
    this.registerUserService.onRegisterUserOK.subscribe(res=>{
      this.openDialog(true)
    })
    this.registerUserService.onResponseError.subscribe(error=>{
      console.log(error)
      this.openDialog(false)})

    this.registerUserForm = new FormGroup(
    {
    UserName:new FormControl('',[Validators.required]),
    EmailAddress:new FormControl('',[Validators.email,Validators.required],this.ValidateEmailInServer())
     })
    
  }

  get UserName() { return this.registerUserForm.get('UserName'); }
  get EmailAddress() { return this.registerUserForm.get('EmailAddress'); }

  
  ValidateEmailInServer():AsyncValidatorFn{
    return (control:AbstractControl):Observable<ValidationErrors|null>=>{
      return this.registerUserService.ValidateUser({"EmailAddress":control.value})
    
    }
  }
  signUp(){
    console.log(this.registerUserForm.pending)
     if(this.registerUserForm.valid){
       console.log("valid")
      this.registerUserService.RegisterUser(this.registerUserForm.value)
     }
     
     else 
       return
  
  }

  openDialog(isOK): void {
    console.log("dialog")
    const dialogRef = this.dialog.open(MaterialDialogComponent, {
      width: '350px',
      data: {
        title:  'Sign Up: '    ,
        content: isOK ? 'User added successfully' : 'Operation failed',
        okBtn: { value: 'OK' }
      }
    })
     dialogRef.afterClosed().subscribe((result) => {
       if(isOK){
        this.router.navigateByUrl('/login');
       }
    })
  }
}
