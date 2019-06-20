import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { User } from '../models/user-model';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {
    public Url: string = environment.userUrl;

    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        return this.http.post<any>(`${this.Url}/auth/login`, JSON.stringify(
            { 'email': email, 'password': password }), this.generateHeaders())
        .pipe(map(user => {
            if (user && user.token) {
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
            return user;
        }));
    }
    logout() {
        localStorage.removeItem('currentUser');
    }
    register(user: User) {
        return this.http.post<any>(`${this.Url}/auth/register`, user);
    }
    private generateHeaders() {
        return {
          headers: new HttpHeaders({'Content-Type': 'application/json'})
        };
      }
}
