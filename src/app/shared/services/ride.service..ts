import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Ride, RideFilterRequest } from "../models/ride.model";

@Injectable()
export class RideService {
  constructor(private http: HttpClient) {}

  public searchRide(
    startFilter: RideFilterRequest,
    endFilter: RideFilterRequest
  ): Observable<any> {
    console.log("start Filter is " + JSON.stringify(startFilter));
    console.log("end Filter is " + JSON.stringify(endFilter));

    return this.http.post(
      "/api/rides/filter",
      { startFilter: startFilter, endFilter: endFilter },
      {
        headers: new HttpHeaders().set("Content-Type", "application/json")
      }
    );
  }

  public createRide(ride: Ride): Observable<Object> {
    return this.http.post("/api/rides", ride, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      observe: "response"
    });
  }

  public joinRide(rideId: string): Observable<any> {
    return this.http.post(`/api/rides/joinRide/${rideId}`, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      observe: "response"
    });
  }

  public getJoinedRides(): Observable<any> {
    return this.http.get(`/api/rides/joined`);
  }

  leaveRide(rideId: string): Observable<any> {
    return this.http.delete(`/api/rides/leaveRide/${rideId}`, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      observe: "response"
    });
  }

  delete(rideId: string): Observable<any> {
    return this.http.delete(`/api/rides/${rideId}`, {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
      observe: "response"
    });
  }
}
