import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RideService } from "../shared/services/ride.service.";
import { Ride, Coords, RideFilterRequest } from "../shared/models/ride.model";
import * as L from "leaflet";
import { DriverProfile } from "../shared/models/profile";
import { Account } from '../shared/models/account.model';

@Component({
  selector: "join-trip",
  templateUrl: "./join-trip.component.html",
  styleUrls: ["./join-trip.component.css"]
})
export class JoinTripComponent implements OnInit {
  private trips: Ride[];
  private startDestinationRadiusInKm: number;
  private endDestinationRadiusInKm: number;
  private map: any;
  private BULG_BOUNDARIES = [
    [41.22681, 22.3487],
    [44.22477, 29.18819]
  ];
  private isStartCoord: boolean = false;
  private isMapHidden: boolean = true;
  private startCoord: Coords = undefined;
  private endCoord: Coords = undefined;

  constructor(private router: Router, private joinTripService: RideService) {
    this.startDestinationRadiusInKm = 2;
    this.endDestinationRadiusInKm = 2;
    this.trips = [];
    joinTripService.searchRide(null, null).subscribe((rides: Ride[]) => {
      this.trips = rides;
    });
  }

  navigateToViewProfilePage(driver: Account) {
    this.router
      .navigate(["view-profile"], {
        queryParams: {
          email: driver.email,
          firstName: driver.firstName,
          lastName: driver.lastName,
        }
      })
      .then(r => console.log("Its successful"));
  }

  doSearch() {
    let startFilter: RideFilterRequest = null;
    if (this.startCoord !== undefined) {
      startFilter = {
        coordinates: this.startCoord,
        radiusInKm: this.startDestinationRadiusInKm
      };
    }
    let endFilter: RideFilterRequest = null;
    if (this.endCoord !== undefined) {
      endFilter = {
        coordinates: this.endCoord,
        radiusInKm: this.endDestinationRadiusInKm
      };
    }
    this.joinTripService
      .searchRide(startFilter, endFilter)
      .subscribe((trips: Ride[]) => {
        this.trips = trips;
      });
  }

  ngOnInit(): void {
    this.initMap();
  }

  addMarker(e) {
    const coord = e.latlng;
    const lat = coord.lat;
    const lng = coord.lng;
    if (this.isStartCoord) {
      this.startCoord = { latitude: lat, longitude: lng };
    } else {
      this.endCoord = { latitude: lat, longitude: lng };
    }
    this.isMapHidden = true;
  }

  deleteLastMarker(e) {
    if (this.isStartCoord) {
      this.startCoord = undefined;
    } else {
      this.endCoord = undefined;
    }
    this.isMapHidden = true;
  }

  selectStart() {
    this.isStartCoord = true;
    this.isMapHidden = false;
  }

  selectEnd() {
    this.isStartCoord = false;
    this.isMapHidden = false;
  }

  clearStart() {
    this.startCoord = undefined;
  }

  clearEnd() {
    this.endCoord = undefined;
  }

  initMap(): void {
    if (this.map === undefined) {
      this.map = L.map("map", {
        zoom: 20
      });
      const tiles = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 19,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }
      );
      this.map.fitBounds(this.BULG_BOUNDARIES);
      tiles.addTo(this.map);
      this.map.on("click", this.addMarker.bind(this));
      this.map.on("contextmenu", this.deleteLastMarker.bind(this));
    }
  }

  joinRide(tripId: string){
      this.joinTripService.joinRide(tripId).subscribe();
  }
}
