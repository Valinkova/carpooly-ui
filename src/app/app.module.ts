import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import {
  MatButtonModule,
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS
} from "@angular/material";

import { AppComponent } from "./app.component";
import { LoginPageComponent } from "./login/login-page.component";
import { AppRoutingModule } from "./app-routing.module";
import { ClarityModule } from "@clr/angular";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SignupPageComponent } from "./signup/signup-page.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomePageComponent } from "./home/home-page.component";
import { JoinTripComponent } from "./join-trip/join-trip.component";
import { CreateTripComponent } from "./create-trip/create-trip.component";
import { CookieService } from "ngx-cookie-service";
import { LoginService } from "./shared/services/login.service";
import { RegistrationService } from "./shared/services/registration.service";
import { ViewProfileComponent } from "./view-profile/view-profile.component";
import { RideService } from "./shared/services/ride.service.";
import { AuthService } from "./shared/services/auth.service";
import { ViewProfileService } from "./shared/services/view-profile.service";
import { MyRidesComponent } from "./my-rides/my-rides.component";
import { MessageArchivedComponent } from "./notifications/snackbar.component";
import { NotificationService } from './notifications/notifications.service';
import { ErrorInterceptorProvider } from './http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignupPageComponent,
    HomePageComponent,
    JoinTripComponent,
    CreateTripComponent,
    ViewProfileComponent,
    MyRidesComponent,
    MessageArchivedComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    LoginService,
    RegistrationService,
    RideService,
    CookieService,
    AuthService,
    ViewProfileService,
    ErrorInterceptorProvider,
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 2500 },
    },
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
