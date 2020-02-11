import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Ride } from '../models/ride.model';

@Injectable()
export class RideService {
    constructor(private http: HttpClient) {
    }

    public searchRide(fromCity: string, toCity: string): Observable<Object> {
        return this.http.post('/api/login', {fromCity, toCity}, {
            headers: new HttpHeaders().set('Content-Type', 'application/json'), observe: 'response'
        }).pipe(catchError((error: HttpErrorResponse) => throwError(error)));
    }

    public  createRide(ride:Ride): Observable<Object> {
        return this.http.post('/api/rides', ride, {
            headers: new HttpHeaders().set('Content-Type', 'application/json'), observe: 'response'
        }).pipe(catchError((error: HttpErrorResponse) => throwError(error)));
    }

    public joinRide(rideId: string): Observable<Object> {
        return this.http.post(`/api/rides/${rideId}`, {
            headers: new HttpHeaders().set('Content-Type', 'application/json'), observe: 'response'
        }).pipe(catchError((error: HttpErrorResponse) => throwError(error)));
    }
}
