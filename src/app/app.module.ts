import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginPageComponent} from './login/login-page.component';
import {AppRoutingModule} from './app-routing.module';
import {ClarityModule} from '@clr/angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SignupPageComponent} from './signup/signup-page.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MainPageComponent} from './main/main-page.component';
import {HomePageComponent} from './home/home-page.component';
import {JoinTripComponent} from './join-trip/join-trip.component';
import {CreateTripComponent} from './create-trip/create-trip.component';
import {LoginService} from './shared/services/login.service';
import {RegistrationService} from './shared/services/registration.service';
import {ViewProfileComponent} from './view-profile/view-profile.component';
import {JoinTripService} from './shared/services/join-trip.service';


@NgModule({
    declarations: [
        AppComponent,
        LoginPageComponent,
        SignupPageComponent,
        MainPageComponent,
        HomePageComponent,
        JoinTripComponent,
        CreateTripComponent,
        ViewProfileComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        ClarityModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [LoginService, RegistrationService, JoinTripService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
