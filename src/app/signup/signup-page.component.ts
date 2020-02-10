import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormControl} from '@angular/forms';
import {Validators} from '@angular/forms';
import {RegistrationService} from '../shared/services/registration.service';
import {LoginService} from '../shared/services/login.service';
import {Router} from '@angular/router';

@Component({
    selector: 'signup-page',
    templateUrl: './signup-page.component.html',
    styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {

    registrationForm = new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.minLength(1)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(1)]),
        email: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    constructor(private router: Router, private registrationService: RegistrationService) {
    }

    onSubmitRegistration() {
        this.registrationService
            .register({
                email: this.registrationForm.get('email').value, passwordHash: this.registrationForm.get('password').value,
                firstName: this.registrationForm.get('firstName').value, surname: this.registrationForm.get('lastName').value
            })
            .subscribe((response: Response) => {
                if (response.ok) {
                    this.router
                        .navigate(['login'])
                        .then(r => console.log('Its successful'));
                }
            });
    }

    isValidForm(): boolean {
        return this.registrationForm.valid;
    }
}
