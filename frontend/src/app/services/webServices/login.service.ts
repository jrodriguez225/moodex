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

  login(platform: string, username: string, password: string) {
    const userData = {
      platform,
      username,
      password
    };
    return this.httpClient.post<any>(this.url, userData);
  }
}