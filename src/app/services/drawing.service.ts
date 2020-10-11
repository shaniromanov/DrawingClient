import { Injectable } from '@angular/core';
import { point } from '../DTO/Models/Point';
import { Marker } from '../DTO/Models/marker';
import { LoginService } from './login.service';
import { EditDocumentService } from './edit-document.service';
import { Subject, Observable, fromEvent } from 'rxjs';
import { debounceTime, buffer, filter, switchMap, takeUntil } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DrawingService {
  mouseUp$ :Observable<any>
  click$ :Observable<any>
  buff$:Observable<any>
  doubleClick$ :Observable<any>
  mousedown$ :Observable<any>
  draw$: Observable<any>


  ModeSubjects:{[responseID:string]:Subject<any>}={
    Rec:new Subject<Array<point>>(),
    Ellipse:new Subject<Array<point>>(),
    Select:new Subject<any>(),
    Free:new Subject<any>()
  }
  currentUser:string
  constructor(private loginService:LoginService, private editDocumentServise:EditDocumentService) {
    this.currentUser=loginService.getCurrentUser().emailAddress
   }

   SetEvents(drawingcanvas:any){
    this.mouseUp$ = fromEvent(drawingcanvas,'mouseup')
    this.click$ = fromEvent(drawingcanvas, 'click')
    this.buff$ = this.click$.pipe(
      debounceTime(250),
    )
    
    this.doubleClick$ = this.click$.pipe(
      buffer(this.buff$),
      filter(list => list.length >= 2),
    )
    this.mousedown$ = fromEvent(drawingcanvas, 'mousedown')
    this.draw$ = this.mousedown$.pipe(
      switchMap(event=>
      fromEvent(drawingcanvas,'mousemove').pipe( 
      takeUntil(this.mouseUp$)  
      )))
   }

  get onRecDraw(){
    return this.ModeSubjects.Rec as Subject<Array<point>>
  }
  get onEllipseDraw(){
    return this.ModeSubjects.Ellipse as Subject<Array<point>>
  }
  get onSelectDraw(){
    return this.ModeSubjects.Select as Subject<any>
  }
  MakeRec(shapePoly:Array<point>,docId:string,foreColor:string,BackColor:string):Marker{
    if (shapePoly.length == 0){
      return 
    }

      var center = new point(0,0)
      center = shapePoly.reduce((acc,pt)=>acc.add(pt))
      center = center.div(shapePoly.length)  
    var lowestX:number=shapePoly[0].X
    var lowestY:number=shapePoly[0].Y
    shapePoly.forEach(point => {
       if(lowestX>point.X){
        lowestX=point.X
       }
       if(lowestY>point.Y){
        lowestY=point.Y
       }
     });
     let retval= new Marker(docId,this.currentUser,"Rec",center.X,center.Y,lowestX,lowestY,foreColor,BackColor)
   return retval
  }

  MakeEllipse(shapePoly:Array<point>,docId:string,foreColor:string,BackColor:string):Marker{
    if (shapePoly.length == 0){
      return 
    }
      var center = new point(0,0)
      center = shapePoly.reduce((acc,pt)=>acc.add(pt))
      center = center.div(shapePoly.length)
      var radius  = new point(0,0)
      radius = shapePoly.reduce((acc,pt)=>acc.add(new point(Math.abs(pt.X-center.X),Math.abs(pt.Y-center.Y))))
      radius = radius.div(shapePoly.length)
      let retval= new Marker(docId,this.currentUser,"Ellipse",center.X,center.Y,radius.X,radius.Y,foreColor,BackColor)
      return retval
  }

 
    
}
 
   
  

