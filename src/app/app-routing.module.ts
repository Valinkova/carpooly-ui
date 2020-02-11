import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './login/login-page.component';
import {NgModule} from '@angular/core';
import {SignupPageComponent} from './signup/signup-page.component';
import {HomePageComponent} from './home/home-page.component';
import {JoinTripComponent} from './join-trip/join-trip.component';
import {CreateTripComponent} from './create-trip/create-trip.component';
import {ViewProfileComponent} from './view-profile/view-profile.component';
import {AuthService} from './shared/services/auth.service';

export const ROUTES: Routes = [
    {path: 'home', component: HomePageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'join-trip', component: JoinTripComponent, canActivate: [AuthService]},
    {path: 'create-trip', component: CreateTripComponent, canActivate: [AuthService]},
    {
        path: 'sign-up',
        component: SignupPageComponent,
        children: [
            {path: 'login', component: LoginPageComponent},
        ]
    },
    {path: 'view-profile', component: ViewProfileComponent},
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/home',
        pathMatch: 'full'
    }

];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
