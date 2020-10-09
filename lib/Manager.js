// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
    };

    getOfficeNumber() {
        return this.officeNumber
    };

    getRole() {
        return "Manager";
    };
};

// const kyle = new Manager("Kyle", 222, "Kyle@hotpot.com", 1);

// kyle.getRole();

// console.log(kyle.name);

module.exports = Manager;

