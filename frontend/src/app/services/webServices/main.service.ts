import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private url;

  constructor(private httpClient: HttpClient) {
    this.url = 'http://localhost:3000/api/main';
  }

  getMain() {
    return this.httpClient.get<any>(this.url);
  }
}