import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-private-tasks',
  templateUrl: './private-tasks.component.html',
  styleUrls: ['./private-tasks.component.css']
})
export class PrivateTasksComponent implements OnInit {

  privateTasks = <any>[];

  constructor(private tasksService: TasksService, private router: Router) { }

  ngOnInit(): void {
    this.tasksService.getPrivateTasks()
      .subscribe(
        (res) => {
          console.log(res);
          this.privateTasks = res;
        },
        (err) => {
          console.error(err);
          if (err instanceof HttpErrorResponse && err.status === 401) {
            this.router.navigate(['/signin']);
          }
        });
  }

}
