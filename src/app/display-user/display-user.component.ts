import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.css']
})
export class DisplayUserComponent implements OnInit {
 
  @Input() user:string
  constructor() { }

  ngOnInit(): void {
  }
  FirstLetter(userId:string):string{
    var name=userId.toUpperCase()
    return name.substring(0,2)

  }

}
