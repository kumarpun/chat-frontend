import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import 'rxjs/add/operator/map';

const BASEURL = environment.backendUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private authToken: string;
    private user: string;
    private Url: string = `${BASEURL}/users`;

  constructor(private http: HttpClient) {}

  registerUser(user): Observable<any> {
    return this.http.post(`${BASEURL}/users/register`, user);
  }

  authenticateUser(user): Observable<any> {
    return this.http.post(`${BASEURL}/users/authenticate`, user);
  }
  loggedIn() {
  }

  getProfile(): any {
  }

  storeUserData(token, user): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }


  getUserData(): any {
    this.loadCredentials();
    let jUser = JSON.parse(this.user);
    let jData = { token: this.authToken, user: jUser};

    return jData;
    }

    loadCredentials(): void {
      let token = localStorage.getItem('token');
      let user = localStorage.getItem('user');
      this.authToken = token;
      this.user = user;
    }
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
}
  private generateHeaders() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json',
      Authorization: this.authToken
    })
    };
  }
}



