import { Injectable } from '@angular/core';
import { CommService } from './comm.service';
import { UploadImageRequest } from '../DTO/Requests/upload-image-request';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UploadImageResponseOK } from '../DTO/Responses/upload-image-response-ok';
import { ResponseError } from '../DTO/Responses/response-error';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  ResponseSubjects:{[responseID:string]:Subject<any>}={
    UploadImageResponseOK:new Subject<UploadImageResponseOK>(),
    ResponseError:new Subject<ResponseError>()
  }
  
  constructor(private commService:CommService) { }
  uploadImage(request:FormData){
    return this.commService.UploadImage(request).
    pipe(map(data=>[data,this.ResponseSubjects[data.responseType]])).
    subscribe(
      ([data,subject])=>subject?.next(data),
    )
  }

  get onUploadImageOK(){
    return this.ResponseSubjects.UploadImageResponseOK
  }
  get onResponseError(){
    return this.ResponseSubjects.ResponseError
  }
}
