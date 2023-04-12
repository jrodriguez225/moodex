import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'ngbd-modal-content',
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title">{{ title }}</h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body">
			<p>{{ body }}</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-primary" (click)="activeModal.close('Close click')">Aceptar</button>
		</div>
	`,
})
export class NgbdModalContent {
  
	@Input() title;
	@Input() body;

	constructor(public activeModal: NgbActiveModal) {
		this.title = '';
		this.body = '';
	}
}

@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './modal.component.html'
})
export class NgbdModalComponent {

	constructor(private modalService: NgbModal) {}

	open(title: string, body: string) {
		const modalRef = this.modalService.open(NgbdModalContent, { centered: true });
		modalRef.componentInstance.title = title;
		modalRef.componentInstance.body = body;
	}
}