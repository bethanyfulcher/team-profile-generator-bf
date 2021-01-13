const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const employees = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function askManager() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of your company?',
            name: "companyName"
        },
        {
            type: 'input',
            message: 'What is your name?',
            name: "managerName"
        },
        {
            type: 'number',
            message: 'What is your id number?',
            name: "managerId"
        },
        {
            type: 'input',
            message: 'What is your email?',
            name: "managerEmail"
        },
        {
            type: 'input',
            message: 'What is your office Number?',
            name: "managerOffice"
        },
    ]).then((answers) => {
        const newManager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOffice)
        employees.push(newManager)
        choose()
    })
}

function choose() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What kind of employee would you like to add?',
            name: "choice",
            choices: ['Engineer', 'Intern', 'Done']
        },
    ]).then(({ choice }) => {
        switch (choice) {
            case "Engineer":
                addEngineer()
                break;
            case "Intern":
                addIntern()
                break;
            case "Done":
                console.log("Creating an html now!")
                createHTML()
                break;
            default:
                break;
        }
    })
}

function addEngineer() {
    inquirer.prompt([
        {
            type: 'input',
            message: `What is this engineer's name?`,
            name: "engineerName"
        },
        {
            type: 'number',
            message: `What is this engineer's id number?`,
            name: "engineerId"
        },
        {
            type: 'input',
            message: `What is this engineer's email?`,
            name: "engineerEmail"
        },
        {
            type: 'input',
            message: `What is this engineer's GitHub username?`,
            name: "engineerGitHub"
        },
    ]).then((answers) => {
        const newEngineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGitHub)
        employees.push(newEngineer);
        choose()
    })
}
function addIntern() {
    inquirer.prompt([
        {
            type: 'input',
            message: `What is this intern's name?`,
            name: "internName"
        },
        {
            type: 'number',
            message: `What is this intern's id number?`,
            name: "internId"
        },
        {
            type: 'input',
            message: `What is this intern's email?`,
            name: "internEmail"
        },
        {
            type: 'input',
            message: `What is this intern's school?`,
            name: "internSchool"
        },
    ]).then((answers) => {
        const newIntern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool)
        employees.push(newIntern)
        choose()
    })
}

function createHTML() {
    fs.writeFile(outputPath, render(employees), (error, data) =>
    error ? console.error(error) : console.log(data));
}

askManager()
