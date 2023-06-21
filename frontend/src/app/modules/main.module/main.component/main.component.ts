import { Component, OnInit } from '@angular/core';

import { SessionService } from '../../../services/generalServices/session.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public sessionService: SessionService) {}

  ngOnInit() {}
}