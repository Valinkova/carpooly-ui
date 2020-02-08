import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private router: Router) {
    }

    navigateToLoginPage() {
        this.router.navigate(['login']).then(r => console.log('Its successful'));
    }

    navigateToSignupPage() {
        this.router.navigate(['sign-up']).then(r => console.log('Its successful'));
    }

    navigateToHomePage() {
        this.router.navigate(['home']).then(r => console.log('Its successful'));
    }
}
