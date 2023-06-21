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
    const tokenizedReq = req.clone({
      setHeaders: {
        Platform: `Bearer ${this.sessionService.getPlatform()}`,
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        Role: `Bearer ${this.sessionService.getRole()}`,
        Expiration: `Bearer ${sessionStorage.getItem('tokenValidity')}`
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
    sessionStorage.setItem('tokenValidity', tokenValidity.toISOString());
  }
}