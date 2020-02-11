import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {RateDriverModel} from '../models/rate-driver.model';

@Injectable()
export class ViewProfileService {
    constructor(private http: HttpClient) {
    }

    public rateDriver(rateDriverModel: RateDriverModel): Observable<Object> {
        return this.http
            .post('/api/rate-driver', rateDriverModel, {
                headers: new HttpHeaders().set('Content-Type', 'application/json'), observe: 'response'
            })
            .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
    }
}
