import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {DriverProfile} from '../shared/models/profile';
import {Driver} from '../shared/models/trip-schema';
import {ActivatedRoute} from '@angular/router';
import {logger} from 'codelyzer/util/logger';
import {ViewProfileService} from '../shared/services/view-profile.service';

@Component({
    selector: 'view-profile',
    templateUrl: './view-profile.component.html',
    styleUrls: ['./view-profile.component.css']
})

export class ViewProfileComponent implements OnInit {
    private profile: DriverProfile;
    private isOpenRank: boolean;
    private comment: string;
    private rate: number;

    constructor(private route: ActivatedRoute, private viewProfileService: ViewProfileService) {
        this.comment = '';
        this.isOpenRank = false;
    }

    ngOnInit(): void {
        this.route.queryParams
            .subscribe((params: Driver) => {
                this.profile = {name: params.name, age: params.age, car: params.car, rank: new Array(params.rank)};
            });
    }

    rankDriver() {
        this.isOpenRank = true;
    }

    closeRankPage() {
        this.isOpenRank = false;
    }

    onSubmitRateClick() {
        this.closeRankPage();
        this.viewProfileService.rateDriver({rate: this.rate, comment: this.comment});
        this.rate = undefined;
    }

    onCancelRateClick() {
        this.closeRankPage();
        this.rate = undefined;
    }

    rateIt(rateNumber: number) {
        this.rate = rateNumber;
    }
}
