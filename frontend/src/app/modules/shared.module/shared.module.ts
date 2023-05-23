import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header.component/header.component';
import { PageNotFoundComponent } from './page-not-found.component/page-not-found.component';
import { NgbdModalComponent } from './modal.component/modal.component';
import { NgbdDatepicker } from './datepicker.component/datepicker.component';

@NgModule({
  declarations: [
    HeaderComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    NgbdModalComponent,
    NgbdDatepicker
  ],
  exports: [
    HeaderComponent
  ]
})
export class SharedModule {}