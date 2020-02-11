import {Component} from '@angular/core';
import {TripSchema} from '../shared/models/trip-schema';
import {Router} from '@angular/router';
import {JoinTripService} from '../shared/services/join-trip.service';

@Component({
    selector: 'join-trip',
    templateUrl: './join-trip.component.html',
    styleUrls: ['./join-trip.component.css']
})

export class JoinTripComponent {
    private trips: TripSchema[];
    private selectedStartCity: string;
    private selectedEndCity: string;

    constructor(private router: Router, private joinTripService: JoinTripService) {
        this.selectedStartCity = '';
        this.selectedEndCity = '';
        this.trips = [];
        // this.trips = [{driver: 'pufi', name: 'elka', fromCity: 'aaa', toCity: 'bbb', price: 23, capacity: 10},
        //     {driver: 'puf', name: 'elka3', fromCity: 'aaa', toCity: 'bbb', price: 23, capacity: 10},
        //     {driver: 'paf', name: 'elka4', fromCity: 'aaa', toCity: 'bbb', price: 23, capacity: 10},
        //     {driver: 'pafi', name: 'elka6', fromCity: 'aaa', toCity: 'bbb', price: 23, capacity: 10}];
    }

    navigateToViewProfilePage() {
        this.router.navigate(['view-profile']).then(r => console.log('Its successful'));
    }

    isEmptySearch() {
        return this.selectedEndCity === '' && this.selectedEndCity === '';
    }

    onSearch() {
        this.joinTripService.searchTrip(this.selectedStartCity, this.selectedEndCity);
    }
}
