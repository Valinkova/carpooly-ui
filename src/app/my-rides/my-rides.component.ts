import { Component, OnInit } from "@angular/core";
import { RideService } from "../shared/services/ride.service.";
import { Ride } from "../shared/models/ride.model";
import { Router } from "@angular/router";
import { AuthService } from "../shared/services/auth.service";
import { MatSnackBar } from "@angular/material";
import { NotificationService } from "../notifications/notifications.service";

@Component({
  selector: "app-my-rides",
  templateUrl: "./my-rides.component.html",
  styleUrls: ["./my-rides.component.css"]
})
export class MyRidesComponent implements OnInit {
  private trips: Ride[] = [];
  private selfAccountId: string;
  constructor(
    private router: Router,
    private rideService: RideService,
    private authService: AuthService,
    public notifier: NotificationService
  ) {
    this.selfAccountId = this.authService.getAccount().id;
  }

  ngOnInit() {
    this.refreshRides();
  }
  refreshRides() {
    this.rideService
      .getJoinedRides()
      .subscribe((rides: Ride[]) => (this.trips = rides));
  }
  leaveRide(id: string) {
    this.rideService.leaveRide(id).subscribe((response: Response) => {
      if (response.ok) {
        this.notifier.showSnackBar("Left ride successfully", "OK", false);
        this.refreshRides();
      }
    });
  }

  deleteRide(id: string) {
    this.rideService.delete(id).subscribe((response: Response) => {
      if (response.ok) {
        this.notifier.showSnackBar("Deleted ride successfully", "OK", false);
        this.refreshRides();
      }
    });
  }

  navigateToViewProfilePage(driver: Account) {
    this.router.navigate(["view-profile"], {
      queryParams: {
        id: driver.id
      }
    });
  }
}
