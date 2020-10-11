import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Document } from '../DTO/Models/Document';
import { map, buffer } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { WsService } from '../services/ws.service';
import { LoginService } from '../services/login.service';
import { point } from '../DTO/Models/Point';
import { DrawingService } from '../services/drawing.service';
import { Marker } from '../DTO/Models/marker';
import { EditDocumentService } from '../services/edit-document.service';
import { HostListener } from '@angular/core';
import { EditColorsComponent } from '../edit-colors/edit-colors.component';
import { FreeDrawingService } from '../services/free-drawing.service';
import { WsDrawingResponse } from '../DTO/Responses/ws-drawing-response';
import { MaterialDialogComponent } from '../material-dialog/material-dialog.component';
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['./edit-document.component.css']
})

export class EditDocumentComponent implements OnInit, AfterViewInit {

  markers:Array<Marker>=new Array<Marker>()
  currentUser:string
  currentDocument:Document
 
  @ViewChild('shapeCanvas',{static:false}) shapeCanvas:ElementRef;
  @ViewChild('drawingCanvas',{static:false}) drawingCanvas:ElementRef;
  @ViewChild('EditShapeColor',{read: ViewContainerRef}) EditShapeColor:ViewContainerRef;

  editColorsComponent = EditColorsComponent;
  
  mouseDown$:any
  poly:Subject<point>
  currentMode:string="Free"
  public currentBackColor:string="#FFFFFF"
  public currentForeColor:string="#000000"
  dynamicComponent:any
  selectedShape:Marker


  constructor(private router:Router, private componentFactoryResolver: ComponentFactoryResolver,private editDocumentService:EditDocumentService,private drawingService:DrawingService, private loginService:LoginService, private wsService:WsService,public activatedRoute: ActivatedRoute,private freeDrawingService:FreeDrawingService,public dialog: MatDialog) {
    this.poly = new Subject<point>() 
   }

   @HostListener('document:keyup', ['$event'])
   handleDeleteKeyboardEvent(event: KeyboardEvent) {
     if(event.key === 'Delete')
     {
       this.remove()
     }
   }


  

  ngOnInit(): void {

    this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe(doc=>this.currentDocument=doc)
    this.wsService.onDrawing.subscribe(data=>{
      var res=data.docId.split("/");
      if (res[0]==this.currentDocument.docID){
        var response=new WsDrawingResponse(res[0],data.userId,+res[1],+res[2],+res[3],+res[4])
        this.freeDraw(response,false)
      }
    })

    this.wsService.onSharingDeleted.subscribe(data=>{
      if(data.docId==this.currentDocument.docID&&data.userId==this.currentUser){
      this.openDialog()
      this.dialog.afterAllClosed.subscribe(data=>
        this.router.navigate(['/documents-list'] )
      )
      }
    })
    this.wsService.onMarkersUpdated.subscribe(data=> {
      if (data.docId==this.currentDocument.docID){
        this.editDocumentService.GetMarkers({DocId:this.currentDocument.docID})
      }
    }) 
    this.wsService.onDocumentDeleted.subscribe(data=>{
      if(data.docId==this.currentDocument.docID){
        console.log("this document deleted!!!!!",data)
        this.openDialog()
        this.dialog.afterAllClosed.subscribe(data=>
          this.router.navigate(['/documents-list'] )
        )
      }
     }) 
    this.editDocumentService.onRemoveMarkerOK.subscribe(data=>{
        const index: number = this.markers.findIndex(marker=>marker.markerId==data.markerId);
        if (index !== -1) {
          this.markers.splice(index, 1);
        } 
        this.ClearFreeDraw()
        this.initCanvas(0,false,this.shapeCanvas)
        this.EditShapeColor.remove() 
      })
    this.editDocumentService.onResponseError.subscribe(data=>{console.log("error",data)})
    this.editDocumentService.GetMarkers({DocId:this.currentDocument.docID})
    this.currentUser=this.loginService.getCurrentUser().emailAddress
  
    this.editDocumentService.onGetMarkersOK.subscribe(data=>{
      if(data.markers){
        this.markers=data.markers
      }
      this.initCanvas(0,false,this.shapeCanvas)
    })
     this.editDocumentService.onCreateMarkerOK.subscribe(data=>{
      this.drawShape(data.marker,0,false,this.shapeCanvas.nativeElement.getContext('2d'))
      this.markers.push(data.marker)
    })
    this.drawingService.onRecDraw.subscribe(shapePoly=>{
     const shape=this.drawingService.MakeRec(shapePoly,this.currentDocument.docID,this.currentForeColor,this.currentBackColor)
     if(shape){
      this.editDocumentService.CreateMarker({RadiusX:shape.radiusX,RadiusY:shape.radiusY,CenterX:shape.centerX,CenterY:shape.centerY,MarkerType:shape.markerType,UserID:shape.userID,ForeColor:shape.foreColor,BackColor:shape.backColor,DocId:shape.docId})
     } 
    })
    this.drawingService.onEllipseDraw.subscribe(shapePoly=>{
      const shape=this.drawingService.MakeEllipse(shapePoly,this.currentDocument.docID,this.currentForeColor,this.currentBackColor)
      if(shape){
        this.editDocumentService.CreateMarker({RadiusX:shape.radiusX,RadiusY:shape.radiusY,CenterX:shape.centerX,CenterY:shape.centerY,MarkerType:shape.markerType,UserID:shape.userID,ForeColor:shape.foreColor,BackColor:shape.backColor,DocId:shape.docId})
      }
    })
    this.drawingService.onSelectDraw.subscribe(res=>{
      this.ClearFreeDraw()
      this.drawShape(this.selectedShape,6,true,this.drawingCanvas.nativeElement.getContext('2d'))
      this.OpenDynamicComponent()
    })
}

remove(){ 
  if(this.selectedShape){
    console.log("selectShape",this.selectedShape)
   this.editDocumentService.RemoveMarker({MarkerId:this.selectedShape.markerId,UserId:this.currentUser,DocId:this.currentDocument.docID})
  }
 
}

openDialog(): void {
  const dialogRef = this.dialog.open(MaterialDialogComponent, {
    width: '350px',
    data: {
      title:  'Document Deleted'    ,
      content:  'This document has been deleted, or your sharing of this document has been canceled',
      okBtn: { value: 'OK' }
    }
  })

}

DrawRec(recPoints:Marker,select:boolean,ctx1){
  console.log("DrawRec",recPoints,select)
  this.ClearFreeDraw()
 ctx1.beginPath();
 ctx1.rect(recPoints.radiusX,recPoints.radiusY ,(recPoints.centerX-recPoints.radiusX)*2,(recPoints.centerY-recPoints.radiusY)*2);

 if(select){
   ctx1.strokeStyle="black"
   ctx1.fillStyle ="rgba(255, 0, 0,.1)"
 }
 else{
   ctx1.strokeStyle=recPoints.foreColor;
   ctx1.fillStyle = recPoints.backColor;
 }
 ctx1.fill();
 ctx1.stroke();
}

DrawEllipse(ellipsePoint:Marker,select:boolean,ctx1){
  this.ClearFreeDraw()
 ctx1.beginPath();
 ctx1.ellipse(ellipsePoint.centerX, ellipsePoint.centerY,ellipsePoint.radiusX,ellipsePoint.radiusY,0, 0, 2 * Math.PI);
 ctx1.fillStyle = ellipsePoint.backColor;
 if(select){
   ctx1.strokeStyle="black";
 }
 else{
   ctx1.strokeStyle=ellipsePoint.foreColor;
 }
 ctx1.fill();
 ctx1.stroke();
}
ClearFreeDraw(){
  var ctx2 = this.drawingCanvas.nativeElement .getContext('2d')
  ctx2.clearRect(0, 0, this.drawingCanvas.nativeElement.width, this.drawingCanvas.nativeElement.height);

}

  UpdateImageUrl(imageUrl:string){
    this.currentDocument.imageUrl=imageUrl
  }

freeDraw(evt,isCurrentUserDrawing:boolean){
  if(this.dynamicComponent){
    this.EditShapeColor.remove()
  }
  var canvas = this.drawingCanvas.nativeElement 
  var ctx2 = canvas.getContext('2d')
   var rect = canvas.getBoundingClientRect();
  var xcanvas = evt.clientX - rect.left
  var ycanvas = evt.clientY - rect.top
  ctx2.beginPath() 
  ctx2.moveTo(xcanvas-evt.movementX,ycanvas-evt.movementY)
  ctx2.lineTo(xcanvas,ycanvas)
  ctx2.stroke()
  if(isCurrentUserDrawing){
    this.poly.next(new point(xcanvas-evt.movementX,ycanvas-evt.movementY))
  }
}

updateCurrentMode(mode:string){
  this.ClearFreeDraw()
  this.currentMode=mode
}

drawShape(shape:Marker,deshNumber:number,select:boolean,ctx){
  ctx.setLineDash([deshNumber]);
  if(shape.markerType=="Rec"){
    this.DrawRec(shape,select,ctx)
  }
 else{
  this.DrawEllipse(shape,select,ctx)
 }
  ctx.stroke();
  ctx.setLineDash([0]);
}
onSelectedBackColor(backColor:string){
  this.currentBackColor=backColor
}
onSelectedForeColor(foreColor:string){
  this.currentForeColor=foreColor
}

initCanvas(deshNumber:number,select:boolean,canvas:any){
  canvas.nativeElement.getContext('2d').clearRect(0, 0, canvas.nativeElement.width, canvas.nativeElement.height);
  this.markers.forEach(marker=>{
    this.drawShape(marker,deshNumber,select,canvas.nativeElement.getContext('2d'))
})
}

OpenDynamicComponent(){
  if(this.dynamicComponent){
    this.EditShapeColor.remove()
  }
  const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.editColorsComponent);
      const component = this.EditShapeColor.createComponent(componentFactory);
      this.dynamicComponent=component
      component.instance.BackColorEmitter.subscribe(color=>{
          var marker=this.markers.find(marker=>marker.markerId==this.selectedShape.markerId)
          marker.backColor=color
          this.initCanvas(0,false, this.shapeCanvas)
      })
      component.instance.ForeColorEmitter.subscribe(color=>{
    
          var marker=this.markers.find(marker=>marker.markerId==this.selectedShape.markerId)
          marker.foreColor=color
          this.initCanvas(0,false,this.shapeCanvas)
      })
      component.instance.positionX=this.selectedShape.centerX.toString()
      component.instance.positionY=this.selectedShape.centerY.toString()
      component.instance.userId=this.currentUser
      component.instance.docId=this.currentDocument.docID
      component.instance.markerId=this.selectedShape.markerId
}

ngAfterViewInit() {
  this.shapeCanvas.nativeElement.width = 800
  this.shapeCanvas.nativeElement.height = 1200
  this.drawingCanvas.nativeElement.width = 800
  this.drawingCanvas.nativeElement.height = 1200
  this.drawingService.SetEvents(this.drawingCanvas.nativeElement)
  this.drawingService.doubleClick$.subscribe(evt=>{
  var coordinateMouse=evt[1] as MouseEvent
  var rect = this.drawingCanvas.nativeElement .getBoundingClientRect();
  var xcanvas = coordinateMouse.clientX - rect.left
  var ycanvas = coordinateMouse.clientY - rect.top
  let minDistance=this.markers.reduce(function(prev, current) { 
    return ((Math.abs(prev.centerX-xcanvas)+ Math.abs(prev.centerY-ycanvas))< (Math.abs(current.centerX-xcanvas)+ Math.abs(current.centerY-ycanvas)) )? prev : current 
})
  this.selectedShape=this.markers.find(marker=>marker.markerId==minDistance.markerId)
  this.drawingService.ModeSubjects["Select"].next()
}
  )

  this.drawingService.draw$.subscribe(evt=>{this.freeDraw(evt,true)
    this.freeDrawingService.FreeDrawing({DocId:this.currentDocument.docID,UserId:this.currentUser,ClientX:evt.clientX,ClientY:evt.clientY,MovementX:evt.movementX,MovementY:evt.movementY}).subscribe(res=>{})
  })
  this.poly.pipe(buffer(this.drawingService.mouseUp$)).subscribe(shapePoly=>{
      this.ClearFreeDraw()
      if(shapePoly.length<1)
      return
      this.drawingService.ModeSubjects[this.currentMode].next(shapePoly)
     })
     
}


}
