import { UsersListComponent } from './components/users/users-list/users-list.component';
import { LandingCampaignsComponent } from './components/landing/landing-campaigns/landing-campaigns.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { canActivate,redirectLoggedInTo,redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { CreateCampaignComponent } from './components/campaigns/create-campaign/create-campaign.component';
import { CampaignListComponent } from './components/campaigns/campaign-list/campaign-list.component';
import { RequestListComponent } from './components/requests/request-list/request-list.component';
import { CreateRequestComponent } from './components/requests/create-request/create-request.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'campaigns',
    component: LandingCampaignsComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'users',
    component: UsersListComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'campaigns/new',
    component: CreateCampaignComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'campaigns/list',
    component: CampaignListComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: ':id/requests',
    component: RequestListComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: ':id/new',
    component: CreateRequestComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

