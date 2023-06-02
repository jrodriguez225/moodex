import { Component, OnInit } from '@angular/core';

import { CoursesService } from '../../../services/webServices/courses.service';
import { SessionService } from '../../../services/generalServices/session.service';

@Component({
  selector: 'app-main-teacher',
  templateUrl: './main-teacher.component.html',
  styleUrls: ['./main-teacher.component.css']
})
export class MainTeacherComponent implements OnInit {
  
  coursesInProgress;
  futureCourses;
  pastCourses;

  constructor(private coursesService: CoursesService, private sessionService: SessionService) {
    this.coursesInProgress = <any>[];
    this.futureCourses = <any>[];
    this.pastCourses = <any>[];
  }

  ngOnInit() {
    this.coursesService.getTeacherCourses().subscribe(
      (data) => {
        const courses = data.body;
        for (let index = 0; index < courses.length; index++) {
          const course = courses[index];
          const coursestartdate = this.getDate(course.coursestartdate);
          const courseenddate = this.getDate(course.courseenddate);
          const date = new Date();
          if (coursestartdate <= date && courseenddate > date) {
            this.coursesInProgress.push(course);
          }
          else if (coursestartdate > date) {
            this.futureCourses.push(course);
          }
          else if (courseenddate <= date) {
            this.pastCourses.push(course);
          }
        }
      },
      (error) => {
        this.sessionService.logout(error);
      }
    );
  }

	getDate (date: { year: number, month: number, day: number}) {
		const year = date.year;
		const month = date.month - 1;
		const day = date.day;
		return new Date(year, month, day);
	}
}