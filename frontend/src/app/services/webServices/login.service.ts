import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url;

  constructor(private httpClient: HttpClient) {
    this.url = 'http://localhost:3000/auth';
  }

  login(username: string, password: string) {
    const userData = {
      username,
      password
    };
    return this.httpClient.post<any>(this.url, userData);
  }
}