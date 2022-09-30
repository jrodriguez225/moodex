export class Employee {
    _id: string;
    name: string;
    position: string;
    office:string;
    salary: string;
    createdAt?: string;
    updatedAt?: string;

    constructor(_id = "", name = "", position = "", office = "", salary = "") {
        this._id = _id;
        this.name = name;
        this.position = position;
        this.office = office;
        this.salary = salary;
    }
}