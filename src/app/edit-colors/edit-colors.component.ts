import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { UpdateMarkerColorServiceService } from '../services/update-marker-color-service.service';

@Component({
  selector: 'app-edit-colors',
  templateUrl: './edit-colors.component.html',
  styleUrls: ['./edit-colors.component.css']
})
export class EditColorsComponent implements OnInit {

  @Output() BackColorEmitter:EventEmitter<string>
  @Output() ForeColorEmitter:EventEmitter<string>
  @Input() positionX:string
  @Input() positionY:string
  @Input() userId:string
  @Input() docId:string
  @Input() markerId:string
  @ViewChild('container',{static:false}) container:ElementRef;
  BackColor:string="#FFFFFF"
  ForeColor:string="#000000"

  constructor(private updateMarkerColorService:UpdateMarkerColorServiceService) { 
    this.BackColorEmitter=new EventEmitter<string>()
    this.ForeColorEmitter=new EventEmitter<string>()
  }

  onSelectedBackColor(evt){
    if(this.markerId){
      this.updateMarkerColorService.UpdateMarkerColor({TypeOfColor:"BackColor" ,MarkerID:this.markerId,Color:evt,UserId:this.userId,DocId:this.docId})
    }
   
    this.BackColorEmitter.emit(evt)
  }
  onSelectedForeColor(evt){
    if(this.markerId){
    this.updateMarkerColorService.UpdateMarkerColor({TypeOfColor:"ForeColor" ,MarkerID:this.markerId,Color:evt,UserId:this.userId,DocId:this.docId})
    }
    this.ForeColorEmitter.emit(evt)
  }
  ngOnInit(): void {
    this.updateMarkerColorService.onResponseError.subscribe(res=>{})
    this.updateMarkerColorService.onUpdateMarkerColorOK.subscribe(res=>{})
  }

}
