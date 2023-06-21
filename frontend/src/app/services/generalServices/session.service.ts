import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private router: Router, private modalService: ModalService) {}

  logout(error?: any) {
    sessionStorage.removeItem('platform');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('fullname');
    sessionStorage.removeItem('tokenValidity');
    this.router.navigate(['/login']);
    if (error) {
      this.modalService.openModal(1, error);
    }
  }

  loggedIn() {
    return !!sessionStorage.getItem('token');
  }

  getRole() {
    return sessionStorage.getItem('role');
  }

  getPlatform() {
    return sessionStorage.getItem('platform');
  }
}