import {Component} from '@angular/core';
import {TripSchema} from '../shared/models/trip-schema';
import {Driver} from '../shared/models/trip-schema';
import {Router} from '@angular/router';
import {RideService} from '../shared/services/ride.service.';

@Component({
    selector: 'join-trip',
    templateUrl: './join-trip.component.html',
    styleUrls: ['./join-trip.component.css']
})

export class JoinTripComponent {
    private trips: TripSchema[];
    private selectedStartCity: string;
    private selectedEndCity: string;

    constructor(private router: Router, private joinTripService: RideService) {
        this.selectedStartCity = '';
        this.selectedEndCity = '';
        this.trips = [];
        this.trips = [{
            driver: {name: 'pufi', age: 13, car: 'Audince', rank: 5},
            name: 'elka',
            fromCity: 'aaa',
            toCity: 'bbb',
            price: 23,
            capacity: 10
        },
            {
                driver: {name: 'pufi', age: 13, car: 'Audince', rank: 5},
                name: 'elka3',
                fromCity: 'aaa',
                toCity: 'bbb',
                price: 23,
                capacity: 10
            },
            {
                driver: {name: 'pufi', age: 13, car: 'Audince', rank: 5},
                name: 'elka4',
                fromCity: 'aaa',
                toCity: 'bbb',
                price: 23,
                capacity: 10
            },
            {
                driver: {name: 'pufi', age: 13, car: 'Audince', rank: 5},
                name: 'elka6',
                fromCity: 'aaa',
                toCity: 'bbb',
                price: 23,
                capacity: 10
            }];
    }

    navigateToViewProfilePage(driver: Driver) {
        this.router.navigate(['view-profile'],
            {queryParams: {name: driver.name, age: driver.age, car: driver.car, rank: driver.rank}})
            .then(r => console.log('Its successful'));
    }

    onSearch() {
        this.joinTripService.searchRide(this.selectedStartCity, this.selectedEndCity).subscribe((trips: TripSchema[]) => {
                this.trips = trips;
            }
        );
    }
}
