import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MaterialSharedModule } from './shared/material-shared.module';
import { RegisterUserComponent } from './register-user/register-user.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CommService } from './services/comm.service';
import { HttpCommService } from './services/http-comm.service';
import { DocumentsListComponent } from './documents-list/documents-list.component';
import { CreateDocumentComponent } from './create-document/create-document.component';
import { MaterialDialogComponent } from './material-dialog/material-dialog.component';
import { EditDocumentComponent } from './edit-document/edit-document.component';
import { ShareDocumentComponent } from './share-document/share-document.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { ColorPickerModule } from 'ngx-color-picker';
import { EditColorsComponent } from './edit-colors/edit-colors.component';
import { ReciversOfDocumentsComponent } from './recivers-of-documents/recivers-of-documents.component';
import { DisplayUserComponent } from './display-user/display-user.component';
import { DeleteDocumentComponent } from './delete-document/delete-document.component';
import { DeleteShareDocumentComponent } from './delete-share-document/delete-share-document.component';
import { UnsubscribeUserComponent } from './unsubscribe-user/unsubscribe-user.component';
import { GetShareUserComponent } from './get-share-user/get-share-user.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    LoginComponent,
    NavbarComponent,
    DocumentsListComponent,
    CreateDocumentComponent,
    MaterialDialogComponent,
    EditDocumentComponent,
    ShareDocumentComponent,
    UploadImageComponent,
    EditColorsComponent,
    ReciversOfDocumentsComponent,
    DisplayUserComponent,
    DeleteDocumentComponent,
    DeleteShareDocumentComponent,
    UnsubscribeUserComponent,
    GetShareUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    ReactiveFormsModule,
    MaterialSharedModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    NgxMatColorPickerModule,
    ColorPickerModule
  ],
  providers: [
    { provide: CommService, useClass: HttpCommService },
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
