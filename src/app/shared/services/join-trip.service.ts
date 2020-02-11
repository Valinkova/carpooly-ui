import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class JoinTripService {
    constructor(private http: HttpClient) {
    }

    public searchTrip(fromCity: string, toCity: string): Observable<Object> {
        return this.http.post('/api/login', {fromCity, toCity}, {
            headers: new HttpHeaders().set('Content-Type', 'application/json'), observe: 'response'
        }).pipe(catchError((error: HttpErrorResponse) => throwError(error)));
    }
}
