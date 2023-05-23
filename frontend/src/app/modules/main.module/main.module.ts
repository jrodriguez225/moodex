import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './main.component/main.component';
import { MainManagerComponent } from './main-manager.component/main-manager.component';
import { MainTeacherComponent } from './main-teacher.component/main-teacher.component';
import { NgbdDatepicker } from '../shared.module/datepicker.component/datepicker.component';

@NgModule({
  declarations: [
    MainComponent,
    MainManagerComponent,
    MainTeacherComponent
  ],
  imports: [
    CommonModule,
    NgbdDatepicker
  ]
})
export class MainModule {}