import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../../services/webServices/login.service';
import { ModalService } from '../../../services/generalServices/modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username;
  password;

  constructor(private loginService: LoginService, private router: Router, private modalService: ModalService) {
    this.username = '';
    this.password = '';
  }

  ngOnInit() {}

  login() {
    this.loginService.login(this.username, this.password).subscribe(
      (data) => {
        sessionStorage.setItem('token', data.body.token);
        sessionStorage.setItem('role', data.body.role);
        this.router.navigate(['/main']);
      },
      (error) => {
        this.modalService.openModal(0, error);
      }
    );
  }
}