import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../models/user-model';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {
    public Url: string = environment.userUrl;
    user: User;
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient,
        ) { 
            this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
            this.currentUser = this.currentUserSubject.asObservable();
        }
        public get currentUserValue(): User {
            return this.currentUserSubject.value;
        }

    login(email: string, password: string) {
        return this.http.post<any>(`${this.Url}/auth/login`, JSON.stringify(
            { 'email': email, 'password': password }), this.generateHeaders())
        .pipe(map(user => {
            if (user && user.token) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }
            return user;
        }));
    }
    
    getAlluser() {
        // tslint:disable-next-line:object-literal-key-quotes
        // tslint:disable-next-line:object-literal-shorthand
        return this.http.get(`${this.Url}/users`);
        }
        getUserbyid(_id) {
                    // tslint:disable-next-line:object-literal-key-quotes
            const headers = new HttpHeaders({ 'Authorization': JSON.parse(localStorage.getItem('currentUser')).token });
                    // tslint:disable-next-line:object-literal-shorthand
            return this.http.get(`${this.Url}/users/${_id}`, {headers: headers});
        }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);

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
