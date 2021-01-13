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
        console.log(newManager)
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
        console.log(newEngineer)
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
        console.log(newIntern)
        employees.push(newIntern)
        choose()
    })
}

function createHTML() {
    fs.writeFile(outputPath, render(employees), (error, data) =>
    error ? console.error(error) : console.log(data));
}

askManager()

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
