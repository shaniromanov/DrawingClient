import { Component, OnInit, Input } from '@angular/core';
import { GetShareUserService } from '../services/get-share-user.service';
import { User } from '../DTO/Models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-get-share-user',
  templateUrl: './get-share-user.component.html',
  styleUrls: ['./get-share-user.component.css']
})
export class GetShareUserComponent implements OnInit {

  docId:string
  users:Array<User>

  constructor(private route: ActivatedRoute,private getShareUserService:GetShareUserService) {
    this.users=new Array<User>()
   }

  ngOnInit(): void {
    this.docId=this.route.snapshot.paramMap.get('id')
    this.getShareUserService.onGetShareUserOK.subscribe(res=>{
      this.users=res.users
    })
    this.getShareUserService.onResponseError.subscribe(error=>{console.log("error",error)})

    this.GetShareUser()
  }
  GetShareUser(){
     this.getShareUserService.GetShareUser({DocId:this.docId})
 }
 onDeletedShareUser(user:string){
  var index=this.users.findIndex(usr=>usr.emailAddress==user)
  if(index!== -1){
    this.users.splice(index,1)
  }
 }

}
