import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './login/login-page.component';
import {NgModule} from '@angular/core';
import {SignupPageComponent} from './signup/signup-page.component';
import {HomePageComponent} from './home/home-page.component';
import {MainPageComponent} from './main/main-page.component';
import {JoinTripComponent} from './join-trip/join-trip.component';
import {CreateTripComponent} from './create-trip/create-trip.component';
import {ViewProfileComponent} from './view-profile/view-profile.component';

export const ROUTES: Routes = [
    {path: 'home', component: HomePageComponent},
    {path: 'login', component: LoginPageComponent},
    {
        path: 'sign-up',
        component: SignupPageComponent,
        children: [
            {path: 'login', component: LoginPageComponent},
        ]
    },
    {
        path: 'main-page',
        component: MainPageComponent,
        children: [
            {path: 'join-trip', component: JoinTripComponent},
            {path: 'create-trip', component: CreateTripComponent}
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
