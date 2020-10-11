import { Injectable } from '@angular/core';
import { CommService } from './comm.service';
import { Subject } from 'rxjs';
import { ResponseError } from '../DTO/Responses/response-error';
import { UpdateMarkerColorResponseOK } from '../DTO/Responses/update-marker-color-response-ok';
import { UpdateMarkerColorRequest } from '../DTO/Requests/update-marker-color-request';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UpdateMarkerColorServiceService {

  ResponseSubjects:{[responseID:string]:Subject<any>}={
    UpdateMarkerColorResponseOK:new Subject<UpdateMarkerColorResponseOK>(),
    ResponseError:new Subject<ResponseError>()
  }
  
  constructor(private commService:CommService) { }

  UpdateMarkerColor(request:UpdateMarkerColorRequest){
    return this.commService.UpdateMarkerColor(request).
    pipe(map(data=>[data,this.ResponseSubjects[data.responseType]])).
    subscribe(
      ([data,subject])=>subject?.next(data),
    )
  }

  get onUpdateMarkerColorOK(){
    return this.ResponseSubjects.UpdateMarkerColorResponseOK
  }
  get onResponseError(){
    return this.ResponseSubjects.ResponseError
  }
}
