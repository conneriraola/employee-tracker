const inquirer = require("inquirer");
const mysql = require('mysql2');
const cTable = require("console.table");

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "business_db"
    },
    firstQ()
);

function fistQ(){
    inquirer.prompt([
        {
            name: "start",
            message: "Please select option",
            choices: [
                "view all departments",
                "view all roles",
                "view all employees",
                "add a department",
                "add a role",
                "add employee",
                "update eployee",
                "exit"],
            type: "list"
        }
    ])
    .then (answers => {
        let answer = (answers["start"]);
        cheackAnswer(answer);
    })
}

function checkAnswer(answers) {
    if(answer === "view all departments") {
        getDepartments();
    } else if (answer === "view all roles") {
        getRoles();
    } else if (answer === "view all employees") {
        getEmployees();
    } else if (answer === "add a department") {
        addDepartment();
    } else if (answer === "add a role") {
        addRole();
    } else if (answer === "add employee") {
        addEmployee();
    } else if (answer === "update employee") {
        UpdateEmployee();
    } 
}