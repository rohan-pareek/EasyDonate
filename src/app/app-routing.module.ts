import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DonateComponent } from './donate/donate.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth.guard';
import { OverviewComponent } from './dashboard/overview/overview.component';
import { DonationsComponent } from './dashboard/donations/donations.component';
import { RequestsComponent } from './dashboard/requests/requests.component';
import { AdminComponent } from './admin/admin.component';
import { ReportedItemsComponent } from './admin/reported-items/reported-items.component';
import { UsersComponent } from './admin/users/users.component';

const routes: Routes = [
  // {
  //   path: '', redirectTo: 'home', pathMatch: 'full'
  // },
  {
    path: '', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent,
    children: [
      {
        path: '', redirectTo: 'overview', pathMatch: 'full'
      },
      {
        path: 'overview', component: OverviewComponent
      },
      {
        path: 'donations', component: DonationsComponent
      },
      {
        path: 'requests', component: RequestsComponent
      }
    ]
  },
  {
    path: 'donation/:id', canActivate: [AuthGuard], component: ItemDetailComponent
  },
  {
    path: 'donate', canActivate: [AuthGuard], component: DonateComponent
  },
  {
    path: 'detail', canActivate: [AuthGuard], component: ItemDetailComponent
  },
  {
    path: 'profile', canActivate: [AuthGuard], component: ProfileComponent
  },
  {
    path: 'admin', canActivate: [AuthGuard], component: AdminComponent,
    children: [
      {
        path: '', redirectTo: 'reporteditems', pathMatch: 'full'
      },
      {
        path: 'reporteditems', component: ReportedItemsComponent
      },
      {
        path: 'browseusers', component: UsersComponent
      }
    ]
  },
  {
    path: '**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
