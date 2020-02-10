import {Injectable} from '@angular/core';
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Account} from '../models/account.model';

@Injectable()
export class RegistrationService {
    constructor(private http: HttpClient) {
    }

    public register(account: Account): Observable<Object> {
        return this.http
            .post('/api/register', account, {
                headers: new HttpHeaders().set('Content-Type', 'application/json'), observe: 'response'
            })
            .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
    }
}
