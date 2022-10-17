import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signIn',
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.css']
})
export class SignInComponent implements OnInit {

  user = {
    username: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  signIn() {
    this.authService.signIn(this.user)
      .subscribe(
        (res) => {
          this.authService.logIn(res);
        },
        (err) => {
          console.error(err);
          this.router.navigate(['/signIn']);
          alert('¡El nombre de usuario y la contraseña no se corresponden!');
        });
  }
}