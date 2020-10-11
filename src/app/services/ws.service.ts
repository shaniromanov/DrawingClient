import { Injectable } from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket'
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { WSResponse } from '../DTO/Responses/wsresponse';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  // onConnect:WebSocketSubject<unknown>
  messageMapper:{[messageType:string]:Subject<WSResponse>}={
    connection:new Subject<WSResponse>(),
    disconnection:new Subject<WSResponse>(),
    markersUpdated:new Subject<WSResponse>(),
    documentDeleted:new Subject<WSResponse>(),
    sharingDeleted:new Subject<WSResponse>(),
    sharingAdded:new Subject<WSResponse>(),
    NewDocumentSharing:new Subject<WSResponse>(),
    RemoveDocumentSharing:new Subject<WSResponse>(),
    Drawing:new Subject<WSResponse>()
  }
  
   ConnectOrDisconnect(id:string,type:string){
     console.log("Service Start")
     var url="wss://localhost:44384/ws?id="+id+"&type="+type
     webSocket(
      {url:url,deserializer: msg => msg}).
      pipe(map(msg=>{
        var data=msg.data.split(' ')
        var res=new WSResponse()
        res.userId=data[1]
        res.docId=data[2]
        return [res,this.messageMapper[data[0]]]})).
      subscribe(
        ([data,subject])=>(subject as Subject<WSResponse>)?.next(data as WSResponse)
      )
   }

   get onConnection(){
    return this.messageMapper.connection
  }
  get onMarkersUpdated(){
    return this.messageMapper.markersUpdated
  }
  get onDisconnection(){
    return this.messageMapper.disconnection
  }

  get onDocumentDeleted(){
    return this.messageMapper.documentDeleted
  }

  get onNewDocumentSharing(){
    return this.messageMapper.NewDocumentSharing
  }
  get onRemoveDocumentSharing(){
    return this.messageMapper.RemoveDocumentSharing
  }
  get onSharingDeleted(){
    return this.messageMapper.sharingDeleted
  }
  get onSharingAdded(){
    return this.messageMapper.sharingAdded
  }
  get onDrawing(){
    return this.messageMapper.Drawing
  }
}
