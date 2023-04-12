import { Component, OnInit } from '@angular/core';

import { MainService } from '../../../services/webServices/main.service';
import { SessionService } from '../../../services/generalServices/session.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  username;
  role;

  constructor(private mainService: MainService, private sessionService: SessionService) {
    this.username = '';
    this.role = '';
  }

  ngOnInit() {
    this.mainService.getMain().subscribe(
      (data) => {
        this.username = data.body.username;
        const role = this.sessionService.getRole();
        if (role) {
          this.role = role;
        }
      },
      (error) => {
        this.sessionService.logout(error);
      }
    );
  }
}