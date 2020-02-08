import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';

@Injectable()
export class SignInService {
    constructor(private http: HttpClient) {
    }

    public isTheUserExist(email: string, password: string): Observable<string> {
        const params = new HttpParams()
            .set('email', email)
            .set('password', password);
        return this.http.post<string>('', {params});
    }
}
