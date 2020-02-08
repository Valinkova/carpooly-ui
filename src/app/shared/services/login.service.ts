import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {LoginRequest} from '../models/login-req.model';

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) {
    }

    // tslint:disable-next-line: ban-types
    public login(loginReq: LoginRequest): Observable<Object> {
        return this.http.post('/api/login', loginReq,{
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        }).pipe(catchError((error: HttpErrorResponse) => throwError(error)));
    }
}
