import { Component, OnInit } from "@angular/core";
import { RideService } from "../shared/services/ride.service.";
import { Ride } from "../shared/models/ride.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-my-rides",
  templateUrl: "./my-rides.component.html",
  styleUrls: ["./my-rides.component.css"]
})
export class MyRidesComponent implements OnInit {
  private trips: Ride[] = [];
  constructor(private router: Router, private rideService: RideService) {}

  ngOnInit() {
    this.rideService
      .getJoinedRides()
      .subscribe((rides: Ride[]) => (this.trips = rides));
  }

  navigateToViewProfilePage(driver: Account) {
    this.router
      .navigate(["view-profile"], {
        queryParams: {
          id: driver.id
        }
      });
  }
}
