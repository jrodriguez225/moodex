const Employee = require("../models/employee");

const employeeCtrl = {};

employeeCtrl.getEmployees = async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);
};

employeeCtrl.createEmployee = async (req, res) => {
    const employee = new Employee(req.body);
    await employee.save();
    res.json({status: "Employee created"});
};

employeeCtrl.getEmployee = async (req, res) => {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    res.json(employee);
};

employeeCtrl.editEmployee = async (req, res) => {
    const { id } = req.params;
    await Employee.findByIdAndUpdate(id, {$set: req.body}, {new: true});
    res.json({status: "Employee updated"});
};

employeeCtrl.deleteEmployee = async (req, res) => {
    const { id } = req.params;
    await Employee.findByIdAndDelete(id);
    res.json({status: "Employee deleted"});
};

module.exports = employeeCtrl;