import {Component} from '@angular/core';
import {SignInService} from '../services/sign-in.service';
import {Router} from '@angular/router';

@Component({
    selector: 'login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

    private email: string;
    private password: string;

    constructor(private signInService: SignInService, private router: Router) {
        this.email = '';
        this.password = '';
    }

    onSubmit() {
        try {
            this.signInService.isTheUserExist(this.email, this.password).subscribe(message => {
                if (message === 'success login') {
                    this.router.navigate(['main-page']).then(r => console.log('Its successful'));
                }
            });
        } catch (e) {
            this.router.navigate(['main-page']).then(r => console.log('Its successful'));
        }

    }

    private validateEmail() {
        if (this.email === '') {
            return true;
        }
        return !(!this.email.includes('@') ||
            this.email.indexOf('@') === 0);
    }

    private validatePassword() {
        if (this.password === '') {
            return true;
        }
        return this.password.length === 6;
    }
}
