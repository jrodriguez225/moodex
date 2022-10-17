import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router: Router) { }

  signIn(user: { username: string; password: string; }) {
    return this.http.post<any>(this.URL + '/signIn', user);
  }

  logIn(res: any) {
    console.log(res);
    localStorage.setItem('token', res.token);
    this.router.navigate(['/private']);
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}