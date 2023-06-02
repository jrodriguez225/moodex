import { Injectable, Component, OnInit, Input } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct, NgbDatepickerModule, NgbCalendar, NgbDatepicker, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { CoursesService } from '../../../services/webServices/courses.service';
import { SessionService } from '../../../services/generalServices/session.service';

const I18N_VALUES = {
	es: {
		weekdays: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
		months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
	}
};

@Injectable()
export class I18n {

	language: keyof typeof I18N_VALUES = 'es';
}

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

	constructor(private _i18n: I18n) {
		super();
	}

	getWeekdayLabel(weekday: number): string {
		return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
	}

	getMonthShortName(month: number): string {
		return I18N_VALUES[this._i18n.language].months[month - 1];
	}

	getMonthFullName(month: number): string {
		return this.getMonthShortName(month);
	}

	getDayAriaLabel(date: NgbDateStruct): string {
		return `${date.day}-${date.month}-${date.year}`;
	}
}

@Component({
	selector: 'ngbd-datepicker',
	standalone: true,
	imports: [NgbDatepickerModule, FormsModule],
	templateUrl: './datepicker.component.html',
	providers: [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }],
	styles: [
		`
			.custom-day {
				text-align: center;
				padding: 0.185rem 0.25rem;
				border-radius: 0.25rem;
				display: inline-block;
				width: 2rem;
			}
			.disabled {
				color: #d3d3d3;
			}
			.selected {
				color: white;
				background-color: #007bff;
			}
			.grey {
				color: white;
				background-color: #808080;
			}
			.orange {
				color: white;
				background-color: #ffa500;
			}
			.red {
				color: white;
				background-color: #ff0000;
			}
			.focusable:hover,
			.focused {
				border: 1px solid #e6e6e6;
			}
		`,
	],
})
export class NgbdDatepicker implements OnInit {

	model!: NgbDateStruct;
	@Input() course;
	events;
	students;

	constructor(private coursesService: CoursesService, private sessionService: SessionService, private calendar: NgbCalendar) {
		this.course = <any>{};
		this.events = <any>[];
		this.students = 0;
	}
	
	ngOnInit() {
		const coursestartdate = this.getUnixTimestamp(this.course.coursestartdate);
		const coursenddate = this.getUnixTimestamp(this.course.courseenddate);
		this.coursesService.getCourseStudentsCalendarEvents(this.course.courseid, coursestartdate, coursenddate).subscribe(
		  (data) => {
			this.events = data.body.events;
			this.students = data.body.students;
		  },
		  (error) => {
			this.sessionService.logout(error);
		  }
		);
	}

	getUnixTimestamp (date: { year: number, month: number, day: number}) {
		const year = date.year;
		const month = date.month - 1;
		const day = date.day;
		return Math.floor(new Date(year, month, day).getTime() / 1000) - 28800;
	}

	isDisabled(date: NgbDate, current?: { year: number; month: number; }) {
		return current !== undefined && date.month !== current.month;
	}

	getStyle (date: NgbDate, disabled: boolean, focused: boolean, selected: boolean) {
		let style = 'custom-day';
		if (disabled) {
			style = `${style} disabled`;
		}
		else if (selected) {
			style = `${style} selected`;
		}
		else {
			style = `${style} focusable`;
			const event = this.events.filter((event: { date: any; }) => this.equalDates(date, event.date))[0];
			if (event) {
				const percentage = event.students / this.students * 100;
				if (percentage > 0 && percentage <= 25) {
					style = `${style} grey`;
				}
				else if (percentage > 25 && percentage <= 50) {
					style = `${style} orange`;
				}
				else if (percentage > 50 && percentage <= 100) {
					style = `${style} red`;
				}
			}
			if (focused) {
				style = `${style} focused`;
			}
		}
		return style;
	}

	equalDates (date1: NgbDate, date2: { year: number, month: number, day: number}) {
		return date1.year === date2.year && date1.month === date2.month && date1.day === date2.day;
	}

	selectToday (dp: NgbDatepicker) {
		this.navigateTo(dp);
		this.model = this.calendar.getToday();
	}

	navigateTo (dp: NgbDatepicker, string?: String) {
		let to = <any>{};
		if (string) {
			let date = null;
			if (string === 'start') {
				date = this.course.coursestartdate;
			}
			else if (string === 'end') {
				date = this.course.courseenddate;
			}
			if (date) {
				const year = date.year;
				const month = date.month;
				to = { year, month };
			}
		}
		dp.navigateTo(to);
	}
}