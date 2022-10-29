import { UploadImagesComponent } from './components/upload-images/upload-images.component';
import { LandingCampaignsComponent } from './components/landing/landing-campaigns/landing-campaigns.component';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../modules/material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { HotToastModule } from '@ngneat/hot-toast';
import { CreateCampaignComponent } from './components/campaigns/create-campaign/create-campaign.component';
import { CampaignListComponent } from './components/campaigns/campaign-list/campaign-list.component';
import { CampaignItemComponent } from './components/campaigns/campaign-item/campaign-item.component';
import { RequestListComponent } from './components/requests/request-list/request-list.component';
import { RequestItemComponent } from './components/requests/request-item/request-item.component';
import { CreateRequestComponent } from './components/requests/create-request/create-request.component';
import { RequestDetailComponent } from './components/requests/request-detail/request-detail.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { UsersItemComponent } from './components/users/users-item/users-item.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LandingComponent,
    LandingCampaignsComponent,
    LoginComponent,
    HomeComponent,
    CreateCampaignComponent,
    CampaignListComponent,
    CampaignItemComponent,
    RequestListComponent,
    RequestItemComponent,
    CreateRequestComponent,
    RequestDetailComponent,
    UsersListComponent,
    UsersItemComponent,
    UploadImagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    HotToastModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
