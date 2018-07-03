import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { SmartContractService  } from './services/smart-contract.service';

import { FirebaseService } from './services/firebase.service'

import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { NavbarComponent } from './components/navbar/navbar.component';
import { UserComponent } from './components/profile/user.component';



import { UserProfileComponent } from './components/profile/user-profile/user-profile.component';

import { HomeComponent } from './components/home/home.component';
import { SliderComponent } from './components/home/slider/slider.component';
import { VideoComponent } from './components/video/video.component';
import { VideoSearchComponent } from './components/video-search/video-search.component';
import { RegisterComponent } from './components/register/register.component';

import { VideoListComponent } from './components/home/video-list/video-list.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { TruncateEthereumAddressPipe } from './custompipes/truncate-ethereum-address.pipe';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserComponent,
    UserProfileComponent,
    HomeComponent,
    SliderComponent,
    VideoComponent,
    VideoSearchComponent,
    RegisterComponent,
    
    VideoListComponent,
    
    FileUploadComponent,
    
    TruncateEthereumAddressPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFirestoreModule
    
  ],
  providers: [
    SmartContractService,
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
