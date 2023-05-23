import { Component, OnInit } from '@angular/core';

import { CoursesService } from '../../../services/webServices/courses.service';
import { SessionService } from '../../../services/generalServices/session.service';

@Component({
  selector: 'app-main-teacher',
  templateUrl: './main-teacher.component.html',
  styleUrls: ['./main-teacher.component.css']
})
export class MainTeacherComponent implements OnInit {
  
  courses;

  constructor(private coursesService: CoursesService, private sessionService: SessionService) {
    this.courses = <any>[];
  }

  ngOnInit() {
    this.coursesService.getTeacherCourses().subscribe(
      (data) => {
        this.courses = data.body;
      },
      (error) => {
        this.sessionService.logout(error);
      }
    );
  }
}