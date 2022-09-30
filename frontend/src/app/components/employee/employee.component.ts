import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.employeeService.selectedEmployee = new Employee();
    }
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(
      (res) => this.employeeService.employees = res,
      (err) => console.error(err)
    );
  }

  addEmployee(form: NgForm) {
    if (form.value.name && form.value.position && form.value.office && form.value.salary) {
      if (form.value._id) {
        this.employeeService.updateEmployee(form.value).subscribe(
          (res) => {
            console.log(res);
            this.getEmployees();
            this.resetForm(form);
          },
          (err) => console.error(err)
        );
      } else {
        form.value._id = null;
        this.employeeService.createEmployee(form.value).subscribe(
          (res) => {
            console.log(res);
            this.getEmployees();
            this.resetForm(form);
          },
          (err) => console.error(err)
        );
      }
    }
    else {
      alert("There can be no any empty field!");
    }
  }

  editEmployee(employee: Employee) {
    this.employeeService.selectedEmployee = employee;
  }

  deleteEmployee(_id: string, form: NgForm) {
    if (confirm("Are you sure you want to delete it?")) {
      this.employeeService.deleteEmployee(_id).subscribe(
        (res) => {
          console.log(res);
          this.getEmployees();
          this.resetForm(form);
        },
        (err) => console.error(err)
      );
    }
  }
}
