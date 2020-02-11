import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, private authService: AuthService) {}

    navigateToLoginPage() {
        this.router.navigate(['login']).then(r => console.log('Its successful'));
    }

    navigateToCreateRidePage() {
        this.router
            .navigate(['create-ride'])
            .then(r => console.log('Navigating to ride creation page'));
    }

    navigateToJoinTripPage() {
        this.router
            .navigate(['join-trip'])
            .then(r => console.log('Navigating to trip join page'));
    }

    navigateToSignupPage() {
        this.router.navigate(['sign-up']).then(r => console.log('Its successful'));
    }

  logout() {
    this.authService.logout();
    this.router.navigate(['home']).then(r => console.log('Its successful'));
  }
}
