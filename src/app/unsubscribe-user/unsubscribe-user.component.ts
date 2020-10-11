import { Component, OnInit } from '@angular/core';
import { UnsubscribeUserService } from '../services/unsubscribe-user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../services/login.service';
import { User } from '../DTO/Models/user';
import { MaterialDialogComponent } from '../material-dialog/material-dialog.component';

@Component({
  selector: 'app-unsubscribe-user',
  templateUrl: './unsubscribe-user.component.html',
  styleUrls: ['./unsubscribe-user.component.css']
})
export class UnsubscribeUserComponent implements OnInit {
  currentUser:User

  constructor(private unsubscribeUserService:UnsubscribeUserService,private router:Router,private dialog:MatDialog,private loginService:LoginService) { }

  ngOnInit(): void {
    this.currentUser=this.loginService.getCurrentUser()
    this.unsubscribeUserService.onRemoveUserOK.subscribe(res=>  {
      this.loginService.setCurrentUser(null,false)
      this.router.navigate([''] )
    })
    this.unsubscribeUserService.onResponseError.subscribe(error=>{
      this.openDialog()
      this.dialog.afterAllClosed.subscribe(data=>{
        this.router.navigate([''] )
      })
    })
  }
  Unsubscribe(){
    this.unsubscribeUserService.RemoveUser({EmailAddress:this.currentUser.emailAddress})
  }
  cancel(){
    this.router.navigate(['/documents-list'] )
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(MaterialDialogComponent, {
      width: '350px',
      data: {
        title:  'Unsubscribe: '    ,
        content:'Some error is apeared, please try later.',
        okBtn: { value: 'OK' }
      }
    })
    
  }

}
