const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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


//Asks user which type of employee to create or calls the output function
function team() {
    inquirer.prompt([
        {
            type: "list",
            name: "type",
            message: "Which type of member would you like to add?",
            choices: [
                "Manager",
                "Engineer",
                "Intern",
                "Create my team"
            ]
        }
    ]).then(function(data){
        if (data.type === "Engineer"){engineer()}
        if (data.type === "Manager"){manager()}
        if (data.type === "Intern"){intern()}
        if (data.type === "Create my team") {output()}
    });
};
//Prompts user for manager details
function manager() {
    inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "What is the manager's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the manager's ID?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the manager's email?"
    },
    {
        type: "input",
        name: "office",
        message: "What is the manager's office number?"
    }
])  .then(function(data){
    const manager = new Manager(data.name, data.id, data.email, data.office);
    employees.push(manager);
   
    team();
});

}
//Prompts user for engineer details
function engineer() {
    inquirer.prompt([
        {
            type: "input",
            name:"name",
            message: "What is the engineer's name?"
        },
        {
            type: "input",
            name:"id",
            message: "What is the engineer's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the engineer's email?"
        },
        {
            type: "input",
            name: "github",
            message: "What is the engineer's GitHub username?"
        }
    ]). then(function(data){
        const engineer = new Engineer(data.name, data.id, data.email, data.github);
        employees.push(engineer);
        team();
    });
};
//Prompts user for intern details
function intern() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the intern's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the intern's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the intern's email?"
        },
        {
            type: "input",
            name: "school",
            message: "What is the intern's school?"
        }
    ]). then(function(data){
        const intern = new Intern(data.name, data.id, data.email, data.school);
        employees.push(intern);
        
        team();
    });
};

//empty array for containing employee info
var employees = []

//Calls render function on employees array and generates the output file
function output() {

    fs.writeFile(outputPath, render(employees), (err) =>
      err ? console.log(err) : console.log('Success!')
    );

  }
    
//Starts app
team();
    



 

