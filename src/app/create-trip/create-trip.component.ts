import { Component, ViewChild, AfterViewInit, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ClrForm } from "@clr/angular";
import * as L from "leaflet";

declare var require: any;
@Component({
  selector: "create-trip",
  templateUrl: "./create-trip.component.html",
  styleUrls: ["./create-trip.component.css"]
})
export class CreateTripComponent implements OnInit {
  @ViewChild(ClrForm) clrForm;
  icon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [13, 0],
      // specify the path here
      iconUrl: "assets/marker-icon.png",
      shadowUrl: "assets/marker-shadow.png"
    })
  };
  private BULG_BOUNDARIES = [
    [41.22681, 22.3487],
    [44.22477, 29.18819]
  ];

  private showMap: boolean = false;
  private map;
  private polyline;
  private markers: Array<any> = [];
  rideForm = new FormGroup({
    name: new FormControl("", Validators.minLength(4)),
    date: new FormControl("", Validators.minLength(1)),
    maxPassengers: new FormControl(4, Validators.min(1)),
    price: new FormControl(0, Validators.min(0.1))
  });

  ngOnInit(): void {
    this.initMap();
  }

  toggleMap() {
    this.showMap = !this.showMap;
  }

  addMarker(e) {
    const coord = e.latlng;
    const lat = coord.lat;
    const lng = coord.lng;
    console.log(
      "You clicked the map at latitude: " + lat + " and longitude: " + lng
    );
    if (this.map === undefined) {
      this.initMap();
    }
    console.log(this.map);
    const marker = new L.Marker(e.latlng, this.icon).addTo(this.map);
    this.markers.push(marker);
    this.refreshPolyline();
  }

  deleteLastMarker() {
    if (this.markers !== undefined && this.markers.length > 0) {
      const marker = this.markers.pop();
      this.map.removeLayer(marker);
      this.refreshPolyline();
    }
  }

  refreshPolyline() {
    if (this.polyline !== undefined) {
      this.map.removeLayer(this.polyline);
      this.polyline = undefined;
    }
    if (this.markers.length > 1) {
      require('leaflet-routing-machine');
      var control = L.Routing.control({
        waypoints: this.markers.map(marker => marker.getLatLng()),
        show: false,
        waypointMode: 'snap',
        router: new L.Routing.OSRMv1({
          serviceUrl: 'http://127.0.0.1:5000/route/v1'
      }),
        createMarker: function() {}
      }).addTo(this.map);
      control.on('routeselected', function(e) {
        this.polyline = L.polyline(e.route.coordinates).addTo(this.map);
        this.map.removeControl(control);
      }.bind(this));
      // this.map.addLayer(this.polyline);
    }
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
      if (this.markers !== undefined) {
        this.markers.forEach(marker => this.map.addLayer(marker));
        this.refreshPolyline();
      }
    }
  }

  isValidInput(): boolean {
    return this.rideForm.valid && this.markers !== undefined && this.markers.length>1;
  }
}
