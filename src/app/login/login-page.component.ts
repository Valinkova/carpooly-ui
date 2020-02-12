import {Component} from '@angular/core';
import {LoginService} from '../shared/services/login.service';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {FormControl} from '@angular/forms';
import {Validators} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
    loginForm = new FormGroup({
        email: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    constructor(private loginService: LoginService, private router: Router, private cookieService: CookieService, public snackBar: MatSnackBar) {
    }

    onSubmit() {
        this.loginService
            .login({email: this.loginForm.get('email').value, password: this.loginForm.get('password').value})
            .subscribe((response: Response) => {
                if (response.ok) {
                    this.cookieService.set('access-token', response.headers.get('Authorization').replace('Bearer ', ''));
                    this.router
                        .navigate(['main-page'])
                        .then(r => console.log('Its successful'));
                    this.snackBar.open('Logged in successfully', 'OK', {
                        duration: 2000,
                        verticalPosition: 'top'
                    });
                } else {
                    this.snackBar.open('Failed to login - ' + response.statusText, 'OK', {
                        duration: 5000,
                        verticalPosition: 'top'
                    });
                }
            });
    }

    isValidForm(): boolean {
        return this.loginForm.valid;
    }

}
