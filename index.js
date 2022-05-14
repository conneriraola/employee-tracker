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

function firstQ(){
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

const getDepartments = () => {
    const sql = "SELECT departments.id as dept_id, departments.department_name as dept_name from departments" 
    db.query(sql, (err, results) => {
        if(err) {
            console.log({error: err.message});
            return;
        }
        console.table(results);

        fisrtQ();
    });
};

function addDepartment() {
    return inquirer.prompt([
        {
            name: "department_name",
            message: "What is the name of the department?",
            type: "input",
        }
    ])
    .then(answer => {
        const userAns = (answer["department_name"]);
        addDepartmentQuery(userAns);
    })
};

const addDepartmentQuery = (answer) => {
    console.log(answer);
    const sql = "Insert INTO departments (department_name) VALUES (?)";
    const params = [answer];

    db.query(sql, params, (err, results) => {
        if (err) {
            console.log({error:err.message});
            return;
        }
        console.log("Success, department added to department table");
        fistQ();
    });
};

const getRoles = () => {
    const sql = "SELECT roles.id as role_id, roles.title as job_title, roles_salary as role_salary, departments.department_name as dept_name FROM roles JOIN departments ON roles.department_id = departments.id";

    db.query(sql, function (err, results) {
        if(err) {
            console.log({error: err.message});
            return;
        }
        console.table(results);
        firstQ();
    });
};

const getEmployees = () => {
    const sql = "SELECT employees.id as employee_id, employees.first_name as first_name, employees.last_name as last_name, roles.title as job_title, roles.salary as role_salary, employees.manager_id as manager_id from emplyees JOIN roles on enployees.role_id = roles.id";

    db.query(sql, function (err, results) {
        if(err) {
            console.log({error:err.message});
            return;
        }
        console.table(results);
        firstQ();
    });
};

function addRole() {
    const sql = "SELECT department as name, id as value FROM departments";

    db.query(sql, (err, departmentList) => {
        inquirer.prompt([
            {
                name: "title",
                message: "What is the title for the new role?",
                type: "input",
            },
            {
                name: "salary",
                message: "What is the salary for this role?",
                type: "input",
            },
            {
                name: "department_id",
                message: "What department is the new role in?",
                type: "list",
                choices: departmentList
            }
        ])
        .then(answer => {
            console.log(answer);
            const title = (answer["title"]);
            const salary = (answer["salary"]);
            const department = (answer["department_id"]);
            addRoleQuery (title, salary, department);
        })
    });
};

const addRoleQuery = (title, salary, department) => {

    const roleSql = "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
    const params = [firstName, lastName, role, manager];

    db.query(sql, params, (err, results) => {
        if (err) {
            console.log({error:err.message});
            return;
        }
        console.log("Success, employee added to employee table");
        firstQ();
    });
};

async function addEmployee() {
    const [ managers ] = await db.promise().query("SELECT CONCAT(first_name, last_name) as name, id as value FROM employees");

    const [ roles ] = await db.promise().query("SELECT title as name, id as value FROM roles");

    const answers = await inquirer.prompt([
        {
            name: "firstName",
            message: "Enter first name",
            type: "input",
        },
        {
            name: "lastName",
            message: "Enter last name",
            type: "input",
        },
        {
            name: "role",
            message: "Choose employee role",
            type: "list",
            choices: roles
        },
        {
            name: "manager",
            message: "Who is their manager?",
            type: "list",
            choices: managers
        },
    ]);

    const firstName = (answers["firstName"]);
    const lastname = (answers["lastName"]);
    const role = (answers["role"]);
    const manager = (answers["manager"]);
    console.log(firstName, lastName, role, manager);

    addDepartmentQuery(firstName, lastName, role, manager);
};