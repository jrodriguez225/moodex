import { Injectable } from '@angular/core';

import { NgbdModalComponent } from '../../modules/shared.module/modal.component/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private ngbdModalComponent: NgbdModalComponent) {}

  openModal(code: Number, error: any) {
    let title = '';
    if (code === 0) {
      title = 'Error al iniciar sesión';
    }
    else if (code === 1) {
      title = 'Fin de la sesión';
    }
    console.error(error);
    this.ngbdModalComponent.open(title, error.error.msg);
  }
}