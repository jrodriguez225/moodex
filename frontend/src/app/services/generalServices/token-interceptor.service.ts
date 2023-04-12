import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private sessionService: SessionService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('token');
    const role = this.sessionService.getRole();
    const tokenValidity = sessionStorage.getItem('tokenValidity');
    const tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        Role: `Bearer ${role}`,
        Expiration: `Bearer ${tokenValidity}`
      }
    });
    return next.handle(tokenizedReq).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this.setTokenValidity();
      }
      return event;
    }));
  }

  setTokenValidity() {
    const tokenValidity = new Date();
    const sessionMinutes = 30;
    tokenValidity.setMinutes(tokenValidity.getMinutes() + sessionMinutes);
    /*const sessionSeconds = 10;
    tokenValidity.setSeconds(tokenValidity.getSeconds() + sessionSeconds);*/
    sessionStorage.setItem('tokenValidity', tokenValidity.toISOString());
  }
}