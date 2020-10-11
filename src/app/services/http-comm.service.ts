import { Injectable } from '@angular/core';
import { CommService } from './comm.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ValidateUserRequest } from '../DTO/Requests/validate-user-request';
import { RegisterUserRequest } from '../DTO/Requests/register-user-request';
import { LoginRequest } from '../DTO/Requests/login-request';
import { GetDocumentsRequest } from '../DTO/Requests/get-documents-request';
import { CreateDocumentRequest } from '../DTO/Requests/create-document-request';
import { ShareDocumentRequest } from '../DTO/Requests/share-document-request';
import { UploadImageRequest } from '../DTO/Requests/upload-image-request';
import { CreateMarkerRequest } from '../DTO/Requests/create-marker-request';
import { GetMarkersRequest } from '../DTO/Requests/get-markers-request';
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
export class HttpCommService implements CommService{


  constructor(private http:HttpClient) { }

  validateUser(validateUserRequest: ValidateUserRequest): Observable<any> {
    return this.http.post('api/ValidateUser/ValidateUser', validateUserRequest);
  }

  RegisterUser(request:RegisterUserRequest): Observable<any>{
    return this.http.post('api/CreateUser/SignUp', request);
  }

  Login(request:LoginRequest): Observable<any>{
    return this.http.post('api/Login/Login', request);
  }
  GetDocuments(request:GetDocumentsRequest): Observable<any>{
    return this.http.get<GetDocumentsRequest>(`api/GetDocuments/GetDocuments/${request.OwnerId}`);
  }
  CreateDocument(request: CreateDocumentRequest): Observable<any>{
    return this.http.post('api/CreateDocument/CreateDocument', request);
  }

  CreateShare(request: ShareDocumentRequest): Observable<any>{
    return this.http.post('api/CreateShare/CreateShare', request);
  }
  UploadImage(request: FormData): Observable<any>{
    console.log("UploadImageRequest", request)
    return this.http.post('api/UploadImage/UploadImage', request);
  }
  GetMarkers(request:GetMarkersRequest): Observable<any>{
    return this.http.post('api/GetMarkers/GetMarkers', request);
  }
  CreateMarker(request:CreateMarkerRequest): Observable<any>{
    return this.http.post('api/CreateMarker/CreateMarker', request);
  }
  RemoveMarker(request:RemoveMarkerRequest): Observable<any>{
    return this.http.post('api/RemoveMarker/RemoveMarker', request);
  }
  DocumentSharing(request:DocumentSharingRequest ):Observable<any>{
    console.log("httpRequest")
    return this.http.post('api/ReciversOfDocument/DocumentSharing', request);
  }
  StopDocumentSharing(request:DocumentSharingRequest ):Observable<any>{
    return this.http.post('api/ReciversOfDocument/StopDocumentSharing', request);
  }
  GetReciversOfDocument(request:GetReciversOfDocumentRequest):Observable<any>{
    return this.http.post('api/ReciversOfDocument/GetReciversOfDocument', request);
  }
  UpdateMarkerColor(request:UpdateMarkerColorRequest):Observable<any>{
    return this.http.post('api/UpdateMarkerColor/UpdateMarkerColor', request);
  }
  RemoveDocument(request:RemoveDocumentRequest):Observable<any>{
    console.log("RemoveDocument",request)
    return this.http.post('api/RemoveDocument/RemoveDocument', request);
  }
  RemoveShare(request:RemoveShareRequest):Observable<any>{
    console.log("RemoveShare",request)
    return this.http.post('api/RemoveShare/RemoveShare', request);
  }
  RemoveUser(request:RemoveUserRequest):Observable<any>{
    return this.http.post('api/RemoveUser/RemoveUser', request);
  }
  GetShareUser(request:GetShareUserRequest):Observable<any>{
    return this.http.post('api/GetShareUser/GetShareUser', request);
  }
  FreeDrawing(request: FreeDrawingRequest) :Observable<any>{
    return this.http.post('api/FreeDrawing/FreeDrawing', request);
  }
}
