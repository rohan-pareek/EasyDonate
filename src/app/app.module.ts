import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DonateComponent } from './donate/donate.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { CharactersOnlyDirective } from './shared/directives/characters-only.directive';
import { HeaderComponent } from './shared/components/header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FooterComponent } from './shared/components/footer/footer.component';
import { OverviewComponent } from './dashboard/overview/overview.component';
import { DonationsComponent } from './dashboard/donations/donations.component';
import { RequestsComponent } from './dashboard/requests/requests.component';
import { DonationFilterPipe } from './shared/pipes/donation-filter.pipe';
import { NumbersOnlyDirective } from './shared/directives/numbers-only.directive';
import { AdminComponent } from './admin/admin.component';
import { ReportedItemsComponent } from './admin/reported-items/reported-items.component';
import { UsersComponent } from './admin/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    AboutComponent,
    DashboardComponent,
    DonateComponent,
    ItemDetailComponent,
    ProfileComponent,
    FilterPipe,
    CharactersOnlyDirective,
    HeaderComponent,
    NotFoundComponent,
    FooterComponent,
    OverviewComponent,
    DonationsComponent,
    RequestsComponent,
    DonationFilterPipe,
    NumbersOnlyDirective,
    AdminComponent,
    ReportedItemsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
