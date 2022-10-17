import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PrivateService {

  private URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getPrivate() {
    return this.http.get<any>(this.URL + '/private');
  }
}