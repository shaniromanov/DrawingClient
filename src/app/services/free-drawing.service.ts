import { Injectable } from '@angular/core';
import { CommService } from './comm.service';
import { FreeDrawingRequest } from '../DTO/Requests/free-drawing-request';

@Injectable({
  providedIn: 'root'
})
export class FreeDrawingService {

  constructor(private commService:CommService) { }
  FreeDrawing(request:FreeDrawingRequest ){
   return this.commService.FreeDrawing(request)

  }
}
