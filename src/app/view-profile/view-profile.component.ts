import {Component} from '@angular/core';
import {DriverProfile} from '../shared/models/profile';

@Component({
    selector: 'view-profile',
    templateUrl: './view-profile.component.html',
    styleUrls: ['./view-profile.component.css']
})

export class ViewProfileComponent {
    private profile: DriverProfile;
    private isOpenRank: boolean;
    private comment: string;

    constructor() {
        this.comment = '';
        this.isOpenRank = false;
        this.profile = {name: 'Pafi Panayotov', age: 22, car: 'Audi', rank: [1, 2, 3, 4, 5]};
    }

    rankDriver() {
        this.isOpenRank = true;
    }

    closeRankPage() {
        this.isOpenRank = false;
    }
}
