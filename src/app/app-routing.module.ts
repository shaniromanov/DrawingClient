import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterUserComponent } from './register-user/register-user.component';
import { LoginComponent } from './login/login.component';
import { DocumentsListComponent } from './documents-list/documents-list.component';
import { EditDocumentComponent } from './edit-document/edit-document.component';
import { ShareDocumentComponent } from './share-document/share-document.component';
import { CreateDocumentComponent } from './create-document/create-document.component';
import { UnsubscribeUserComponent } from './unsubscribe-user/unsubscribe-user.component';
import { GetShareUserComponent } from './get-share-user/get-share-user.component';


const routes: Routes = [

  {path:'register-user',component:RegisterUserComponent},
  { path: 'login', component: LoginComponent },
  { path:'documents-list', component: DocumentsListComponent },
  { path:'document', component: EditDocumentComponent },
  { path: 'share-document/:id', component: ShareDocumentComponent},
  { path: 'create-document', component: CreateDocumentComponent},
  { path: 'unsubscribe-user', component: UnsubscribeUserComponent},
  { path: 'get-share-user/:id', component: GetShareUserComponent}
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
