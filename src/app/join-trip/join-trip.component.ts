import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RideService} from '../shared/services/ride.service.';
import {Ride, Coords, RideFilterRequest} from '../shared/models/ride.model';
import * as L from 'leaflet';
import {DriverProfile} from '../shared/models/profile';
import {Account} from '../shared/models/account.model';
import {MatSnackBar} from '@angular/material';
import {MessageArchivedComponent} from '../notifications/snackbar.component';
import {NotificationService} from '../notifications/notifications.service';

declare var require: any;

@Component({
    selector: 'join-trip',
    templateUrl: './join-trip.component.html',
    styleUrls: ['./join-trip.component.css']
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
    polyline: any = undefined;
    private isStartCoord = false;
    private isMapHidden = true;
    private startCoord: Coords = undefined;
    private endCoord: Coords = undefined;

    private isCreatedTripMapHidden = true;
    private createdTripMap: any;

    constructor(
        private router: Router,
        private joinTripService: RideService,
        public notifier: NotificationService
    ) {
        this.startDestinationRadiusInKm = 2;
        this.endDestinationRadiusInKm = 2;
        this.trips = [];
        joinTripService.searchRide(null, null).subscribe((rides: Ride[]) => {
            this.trips = rides;
        });
    }

    navigateToViewProfilePage(driver: Account) {
        this.router
            .navigate(['view-profile'], {
                queryParams: {
                    id: driver.id
                }
            })
            .then(r => console.log('Its successful'));
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
        this.initMap2();
    }

    addMarker(e) {
        const coord = e.latlng;
        const lat = coord.lat;
        const lng = coord.lng;
        if (this.isStartCoord) {
            this.startCoord = {latitude: lat, longitude: lng};
        } else {
            this.endCoord = {latitude: lat, longitude: lng};
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
        this.isMapHidden = !this.isMapHidden;
    }

    selectEnd() {
        this.isStartCoord = false;
        this.isMapHidden = !this.isMapHidden;
    }

    clearStart() {
        this.startCoord = undefined;
    }

    clearEnd() {
        this.endCoord = undefined;
    }

    initMap(): void {
        if (this.map === undefined) {
            this.map = L.map('map', {
                zoom: 20
            });
            const tiles = L.tileLayer(
                'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                {
                    maxZoom: 19,
                    attribution:
                        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }
            );
            this.map.fitBounds(this.BULG_BOUNDARIES);
            tiles.addTo(this.map);
            this.map.on('click', this.addMarker.bind(this));
            this.map.on('contextmenu', this.deleteLastMarker.bind(this));
        }
    }

    initMap2(): void {
      if (this.createdTripMap === undefined) {
        this.createdTripMap = L.map('map2', {zoom: 20});
        const tiles = L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
              maxZoom: 19,
              attribution:
                  '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }
        );
        this.createdTripMap.fitBounds(this.BULG_BOUNDARIES);
        tiles.addTo(this.createdTripMap);
      }
    }

    joinRide(tripId: string, tripName?: string) {
        this.joinTripService.joinRide(tripId).subscribe((response: Response) => {
            this.notifier.showSnackBar(
                `Joined ride ${tripName} successfully`,
                'OK',
                false
            );
        });
        this.doSearch();
    }

    viewRide(tripId: number) {
        for (let ride of this.trips) {
            if (ride.id === tripId) {
                console.log(ride);
                this.initMap2();
                this.isCreatedTripMapHidden = false;
                this.refreshPolyline(ride);
            }
        }
    }

  refreshPolyline(ride: Ride) {
    if (this.polyline !== undefined) {
      this.createdTripMap.removeLayer(this.polyline);
      this.polyline = undefined;
    }
    require('leaflet-routing-machine');

    const control = L.Routing.control({
      waypoints: ride.pathCoordinates.map((coords: Coords) => L.latLng(coords.latitude, coords.longitude)),
      show: false,
      waypointMode: 'snap',
      router: new L.Routing.OSRMv1({
        serviceUrl: 'http://127.0.0.1:5000/route/v1'
      }),
      createMarker() {}
    }).addTo(this.createdTripMap);
    control.on(
        'viewreset',
        function(e) {
          this.polyline = L.polyline(e.route.coordinates).addTo(this.createdTripMap);
          this.createdTripMap.removeControl(control);
        }.bind(this)
    );
      // this.map.addLayer(this.polyline);
  }
}
