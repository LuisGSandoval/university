import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { UserComponent } from './components/profile/user.component';

import { HomeComponent } from './components/home/home.component';
import { VideoComponent } from './components/video/video.component';
import { VideoSearchComponent } from './components/video-search/video-search.component';
import { RegisterComponent } from './components/register/register.component';

import { FileUploadComponent } from './components/file-upload/file-upload.component'


const routes: Routes = [
  {path: 'user', component: UserComponent},
  {path: 'video', component:VideoComponent },
  {path: 'videoSearch', component: VideoSearchComponent},
  {path: 'videoUpload', component: FileUploadComponent},
  {path: 'register', component: RegisterComponent},
  
  {path: '', component: HomeComponent },
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
