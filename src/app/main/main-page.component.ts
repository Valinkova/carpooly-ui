import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css']
})

export class MainPageComponent {
    constructor(private router: Router) {
    }

    navigateToCreateTripPage() {
        this.router.navigate(['main-page/create-trip']).then(r => console.log('Its successful'));
    }

    navigateToJoinTripPage() {
        this.router.navigate(['main-page/join-trip']).then(r => console.log('Its successful'));
    }

}
