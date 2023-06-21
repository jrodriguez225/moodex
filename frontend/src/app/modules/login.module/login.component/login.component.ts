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

  platform;
  username;
  password;
  hiddenPassword;

  constructor(private loginService: LoginService, private router: Router, private modalService: ModalService) {
    this.platform = '';
    this.username = '';
    this.password = '';
    this.hiddenPassword = true;
  }

  ngOnInit() {}

  login() {
    const split = this.platform.split('/');
    if (split.length === 4 && (split[0] === 'http:' || split[0] === 'https:') && split[1] === '' && split[2] !== '' && split[3] === '') {
      this.loginService.login(this.platform, this.username, this.password).subscribe(
        (data) => {
          sessionStorage.setItem('platform', this.platform);
          sessionStorage.setItem('token', data.body.token);
          sessionStorage.setItem('role', data.body.role);
          sessionStorage.setItem('fullname', data.body.fullname);
          this.router.navigate(['/main']);
        },
        (error) => {
          this.modalService.openModal(0, error);
        }
      );
    }
    else this.modalService.openModal(0, { error: { msg: 'Introduce una URL con el siguiente formato: http(s)://example/'}});
  }

  togglePassword() { 
    this.hiddenPassword = !this.hiddenPassword;
  }
}