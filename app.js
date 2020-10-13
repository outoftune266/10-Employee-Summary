const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let managerQuestions = [{
    type: "input",
    message: "Welcome, Manager! What is your name?",
    name: "name"
},
{
    type: "input",
    message: "What is your employee ID number?",
    name: "id"
},
{
    type: "input",
    message: "What is your email?",
    name: "email"
},
{
    type: "input",
    message: "What is your office number?",
    name: "officeNumber"
}];

let moreEmployees = { type: "list", message: "What other employees do you have?", choices: ["Engineer", "Intern", new inquirer.Separator(), "I have no more employees"], name: "nextEmployee" };

let engineerQuestions = [{
    type: "input",
    message: "What is your Engineer's name?",
    name: "name"
},
{
    type: "input",
    message: "What is their employee ID number?",
    name: "id"
},
{
    type: "input",
    message: "What is their email?",
    name: "email"
},
{
    type: "input",
    message: "What is their Github username?",
    name: "github"
}];

let internQuestions = [{
    type: "input",
    message: "What is your Interns's name?",
    name: "name"
},
{
    type: "input",
    message: "What is their employee ID number?",
    name: "id"
},
{
    type: "input",
    message: "What is their email?",
    name: "email"
},
{
    type: "input",
    message: "What school do they attend?",
    name: "school"
}];

let employees = [];
let html;

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
var prompt = inquirer.createPromptModule();

getManager();

function getManager() {
    prompt(managerQuestions).then(response => {
        const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
        employees.push(manager);
        console.log(employees);
        nextEmployee();
    })
};

function nextEmployee() {
    prompt(moreEmployees).then(response => {
        if (response.nextEmployee === "Engineer") {
            getEngineer();
        } else if (response.nextEmployee === "Intern") {
            getIntern();
        } else {
            html = render(employees);
            fs.appendFile("./output/team.html", html, (err) => {
                if (err) throw err;
                console.log("Your team page was successfully generated!")
            })
        }
    });
};

function getEngineer() {
    prompt(engineerQuestions).then(response => {
        const engineer = new Engineer(response.name, response.id, response.email, response.github);
        employees.push(engineer);
        console.log(employees);
        nextEmployee();
    });
};

function getIntern() {
    prompt(internQuestions).then(response => {
        const intern = new Intern(response.name, response.id, response.email, response.school);
        employees.push(intern);
        console.log(employees);
        nextEmployee();
    });
};

module.exports = employees;

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
