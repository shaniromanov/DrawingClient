export class Marker {
    markerId:string 
    docId:string 
    userID:string 
    markerType:string
    centerX:number 
    centerY:number
    radiusX:number
    radiusY:number
    foreColor:string 
    backColor:string
   
    constructor(docId:string ,userID:string ,markerType:string,centerX:number ,
        centerY:number, radiusX:number,radiusY:number,foreColor:string, backColor:string) {
       this.docId=docId
       this.userID=userID
       this.markerType=markerType
       this.centerX=centerX
       this.centerY=centerY
       this.radiusX=radiusX
       this.radiusY=radiusY
       this.foreColor=foreColor
       this.backColor=backColor

    }
}
