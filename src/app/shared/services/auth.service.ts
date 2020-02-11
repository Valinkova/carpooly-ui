import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthService implements CanActivate {
    COOKIE_KEY = 'access-token';
    roles: string[] = ['PASSENGER', 'DRIVER', 'MODERATOR', 'ADMIN']

    constructor(private http: HttpClient, private cookieService: CookieService) {
    }

    // tslint:disable-next-line: ban-types
    public isAuthorized(): boolean {
       return this.cookieService.check(this.COOKIE_KEY);
    }

    public getRole(): string {
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(this.getToken());
        console.log(JSON.stringify(decodedToken));
        return decodedToken.role[0];
     }

    canActivate(): boolean {
        return this.isAuthorized();
    }

    public getToken(): string {
        return this.cookieService.get(this.COOKIE_KEY);
    }

    public isAtleastPassenger(): boolean {
        return this.isAuthorized();
    }

    public isAtleastDriver(): boolean {
        return this.hasRoleAccess('DRIVER');
    }

    public isAtleastModerator(): boolean {
        return this.hasRoleAccess('MODERATOR');
    }

    public isAtleastAdmin(): boolean {
        return this.hasRoleAccess('ADMIN');
    }

    public logout() {
        this.cookieService.delete(this.COOKIE_KEY);
    }

    private getApplicableRolesForRole(role: string): string[]{
        const index = this.roles.indexOf(role);
        if(index===-1){
            return [];
        }
        return this.roles.slice(0, index+1);
    }

    private getApplicableRoles(): string[]{
        return this.getApplicableRolesForRole(this.getRole());
    }

    private hasRoleAccess(role: string): boolean {
        return this.getApplicableRoles().indexOf(role) !== -1;
    }
}
