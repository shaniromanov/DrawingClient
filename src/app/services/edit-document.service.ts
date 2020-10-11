import { Injectable } from '@angular/core';
import { CommService } from './comm.service';
import { Subject } from 'rxjs';
import { ResponseError } from '../DTO/Responses/response-error';
import { CreateMarkerResponseOK } from '../DTO/Responses/create-marker-response-ok';
import { GetMarkersResponseOK } from '../DTO/Responses/get-markers-response-ok';
import { RemoveMarkerResponseOK } from '../DTO/Responses/remove-marker-response-ok';
import { CreateMarkerRequest } from '../DTO/Requests/create-marker-request';
import { map } from 'rxjs/operators';
import { GetMarkersRequest } from '../DTO/Requests/get-markers-request';
import { RemoveMarkerRequest } from '../DTO/Requests/remove-marker-request';

@Injectable({
  providedIn: 'root'
})
export class EditDocumentService {

  ResponseSubjects:{[responseID:string]:Subject<any>}={
    CreateMarkerResponseOK:new Subject<CreateMarkerResponseOK>(),
    GetMarkersResponseOK :new Subject<GetMarkersResponseOK>(),
    RemoveMarkerResponseOK:new Subject<RemoveMarkerResponseOK>(),
    ResponseError:new Subject<ResponseError>()
  }
  constructor(private commService:CommService) { }

  CreateMarker(request:CreateMarkerRequest){
    console.log("CreateMarkerRequest",request)
    return this.commService.CreateMarker(request).
    pipe(map(data=>[data,this.ResponseSubjects[data.responseType]])).
    subscribe(
      ([data,subject])=>subject?.next(data),
    )
  }

  GetMarkers(request:GetMarkersRequest){

    return this.commService.GetMarkers(request).
    pipe(map(data=>[data,this.ResponseSubjects[data.responseType]])).
    subscribe(
      ([data,subject])=>{
        console.log("dataFromServer",data)
        subject?.next(data)}
    )
  }

  RemoveMarker(request:RemoveMarkerRequest){
    return this.commService.RemoveMarker(request).
    pipe(map(data=>[data,this.ResponseSubjects[data.responseType]])).
    subscribe(
      ([data,subject])=>subject?.next(data),
    )
  }

  get onCreateMarkerOK(){
    return this.ResponseSubjects.CreateMarkerResponseOK
  }
  get onResponseError(){
    return this.ResponseSubjects.ResponseError
  }
  get onGetMarkersOK(){
    return this.ResponseSubjects.GetMarkersResponseOK
  }
  get onRemoveMarkerOK(){
    return this.ResponseSubjects.RemoveMarkerResponseOK
  }
}
