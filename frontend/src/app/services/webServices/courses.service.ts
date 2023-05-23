import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private url;

  constructor(private httpClient: HttpClient) {
    this.url = 'http://localhost:3000/api/courses';
  }

  getTeacherCourses() {
    return this.httpClient.get<any>(this.url);
  }

  getCourseStudentsCalendarEvents(courseid: number, coursestartdate: number, courseenddate: number) {
    const courseData = {
      courseid,
      coursestartdate,
      courseenddate
    }
    return this.httpClient.post<any>(this.url, courseData);
  }
}