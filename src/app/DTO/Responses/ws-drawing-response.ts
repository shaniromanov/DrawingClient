export class WsDrawingResponse {
    docId:string 
    userId:string
    clientX:number 
    clientY:number
    movementX:number
    movementY:number

    constructor(   docId:string ,userId:string, clientX:number ,clientY:number,movementX:number, movementY:number) {
        this.docId=docId
        this.userId=userId
        this.clientX=clientX
        this.clientY=clientY
        this.movementX=movementX
        this.movementY=movementY
    }
}
