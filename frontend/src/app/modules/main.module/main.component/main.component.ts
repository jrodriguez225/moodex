import { Component, OnInit } from '@angular/core';

import { SessionService } from '../../../services/generalServices/session.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  role;

  constructor(private sessionService: SessionService) {
    this.role = '';
  }

  ngOnInit() {
    const role = this.sessionService.getRole();
    if (role) {
      this.role = role;
    }
  }
}