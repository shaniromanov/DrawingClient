import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterUserRequest } from '../DTO/Requests/register-user-request';
import { ValidateUserRequest } from '../DTO/Requests/validate-user-request';
import { LoginRequest } from '../DTO/Requests/login-request';
import { GetDocumentsRequest } from '../DTO/Requests/get-documents-request';
import { CreateDocumentRequest } from '../DTO/Requests/create-document-request';
import { GetDocumentRequest } from '../DTO/Requests/get-document-request';
import { ShareDocumentRequest } from '../DTO/Requests/share-document-request';
import { UploadImageRequest } from '../DTO/Requests/upload-image-request';
import { GetMarkersRequest } from '../DTO/Requests/get-markers-request';
import { CreateMarkerRequest } from '../DTO/Requests/create-marker-request';
import { RemoveMarkerRequest } from '../DTO/Requests/remove-marker-request';
import { GetReciversOfDocumentRequest } from '../DTO/Requests/get-recivers-of-document-request';
import { UpdateMarkerColorRequest } from '../DTO/Requests/update-marker-color-request';
import { RemoveDocumentRequest } from '../DTO/Requests/remove-document-request';
import { RemoveShareRequest } from '../DTO/Requests/remove-share-request';
import { RemoveUserRequest } from '../DTO/Requests/remove-user-request';
import { GetShareUserRequest } from '../DTO/Requests/get-share-user-request';
import { DocumentSharingRequest } from '../DTO/Requests/document-sharing-request';
import { FreeDrawingRequest } from '../DTO/Requests/free-drawing-request';

@Injectable({
  providedIn: 'root'
})
export abstract class CommService {
 


  constructor() { }

  abstract validateUser(validateUserRequest: ValidateUserRequest): Observable<any>
  abstract RegisterUser(request:RegisterUserRequest): Observable<any>
  abstract Login(request:LoginRequest): Observable<any>
  abstract GetDocuments(request:GetDocumentsRequest): Observable<any>
  abstract CreateDocument(request: CreateDocumentRequest): Observable<any>
  abstract CreateShare(request: ShareDocumentRequest): Observable<any>
  abstract UploadImage(request: FormData): Observable<any>
  abstract GetMarkers(request:GetMarkersRequest): Observable<any>
  abstract CreateMarker(request:CreateMarkerRequest): Observable<any>
  abstract RemoveMarker(request:RemoveMarkerRequest): Observable<any>
  abstract GetReciversOfDocument(request:GetReciversOfDocumentRequest):Observable<any>
  abstract UpdateMarkerColor(request:UpdateMarkerColorRequest):Observable<any>
  abstract RemoveDocument(request:RemoveDocumentRequest):Observable<any>
  abstract RemoveShare(request:RemoveShareRequest):Observable<any>
  abstract RemoveShare(request:RemoveShareRequest):Observable<any>
  abstract RemoveUser(request:RemoveUserRequest):Observable<any>
  abstract GetShareUser(request:GetShareUserRequest):Observable<any>
  abstract DocumentSharing(request:DocumentSharingRequest ):Observable<any>
  abstract StopDocumentSharing(request:DocumentSharingRequest ):Observable<any>
  abstract FreeDrawing(request: FreeDrawingRequest) :Observable<any>
 
}
