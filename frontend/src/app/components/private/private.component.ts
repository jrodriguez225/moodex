import { Component, OnInit } from '@angular/core';
import { PrivateService } from "../../services/private.service";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {

  username = '';

  constructor(
    private privateService: PrivateService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.privateService.getPrivate()
      .subscribe(
        (res) => {
          console.log(res);
          this.username = res;
        },
        (err) => {
          console.error(err);
          this.authService.logOut();
        });
  }
}
