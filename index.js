const inquirer = require("inquirer");
const mysql = require('mysql2');
const cTable = require("console.table");

const db = mysql.createConnection(
    {
        host: "localhost",
        port: "3306",
        user: "root",
        password: "",
        database: "company_db"
    },
    firstQuestion()
);

function firstQuestion(){
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
                "update employee",
                "exit"],
            type: "list"
        }
    ])
    .then(function (data) {
        if (data.start == "view all departments") {
            getDepartments();  
        } else if (data.start == "view all roles") {
            getRoles();  
        } else if (data.start == "view all employees") {
            getEmployees();  
        } else if (data.start == "add a department") {
            addDepartment();  
        } else if (data.start == "add a role") {
            addRole();  
        } else if (data.start == "add employee") {
            addEmployee();  
        } else if (data.start == "update employee") {
            updateEmployee();  
        } else if (data.start == "exit") {
           console.log("You have exited the program");
           process.exit();
        } 
    });
}

const getDepartments = () => {
    const sql = "SELECT id as dept_id, name as dept_name from department" 
    db.query(sql, (err, results) => {
        if(err) {
            console.log({error: err.message});
            return;
        }
        console.table(results);

        firstQuestion();
    });
};

function addDepartment() {
    return inquirer.prompt([
        {
            name: "name",
            message: "What is the name of the department?",
            type: "input",
        }
    ])
    .then(answer => {
        const userAns = (answer["name"]);
        addDepartmentQuery(userAns);
    })
};

const addDepartmentQuery = (answer) => {
    console.log(answer);
    const sql = "Insert INTO department (name) VALUES (?)";
    const params = [answer];

    db.query(sql, params, (err, results) => {
        if (err) {
            console.log({error:err.message});
            return;
        }
        console.log("Success, department added to department table");
        firstQuestion();
    });
};

const getRoles = () => {
    const sql = "SELECT role.id as role_id, role.title as job_title, salary as salary, department.name as dept_name FROM role JOIN department ON role.department_id = department.id";

    db.query(sql, function (err, results) {
        if(err) {
            console.log({error: err.message});
            return;
        }
        console.table(results);
        firstQuestion();
    });
};

const getEmployees = () => {
    const sql = "SELECT employee.id as employee_id, employee.first_name as first_name, employee.last_name as last_name, role.title as job_title, role.salary as salary, employee.manager_id as manager_id from employee JOIN role on employee.role_id = role.id";

    db.query(sql, function (err, results) {
        if(err) {
            console.log({error:err.message});
            return;
        }
        console.table(results);
        firstQuestion();
    });
};
const addRoleQuery = (title, salary, department) => {

    const roleSql = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
    const params = [title, salary, department];
    console.log("This is inside add role query")

    db.query(roleSql, params, (err, results) => {
        if (err) {
            console.log(results);
            console.log({error:err.message});
            return;
        }
        console.log("Success, role added to employee table");
        firstQuestion();
    });
};

const addRole = () => {
    const sql = "SELECT name, id as value FROM department";
    console.log("inside add role");

    db.query(sql, (err, departmentList) => {
        console.log(err);
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



const addEmployeeQuery = (firstName, lastName, role, manager) => {

    const sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
    const params = [firstName, lastName, role, manager];

    db.query(sql, params, (err, results) => {
        if (err) {
            console.log({error:err.message});
            return;
        }
        console.log("Success, employee added to employee table");
        firstQuestion();
    });
};



async function addEmployee() {
    const [ managers ] = await db.promise().query("SELECT CONCAT(first_name, last_name) as name, id as value FROM employee");

    const [ roles ] = await db.promise().query("SELECT title as name, id as value FROM role");

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
    const lastName = (answers["lastName"]);
    const role = (answers["role"]);
    const manager = (answers["manager"]);
    console.log(firstName, lastName, role, manager);

    addEmployeeQuery(firstName, lastName, role, manager);
};

const updateEmployeeQuery = (employeeName, newRole, newManager) => {
    const sql = 'Update employee SET role_id = ?, manager_id = ? WHERE id = ?';
    const params = [newRole, newManager, employeeName];

    db.query(sql, params, (err, results) => {
        if (err) {
            console.log({error:err.message});
            return;
        }
        console.log("Success, employee updated in database");
        firstQuestion();
    })
}

async function updateEmployee() {
    const [ employees ] = await db.promise().query("SELECT CONCAT (first_name, ' ', last_name) as name, id as value FROM employee");
    const [ roles ] = await db.promise().query("SELECT title as name, id as value FROM role");
    const [ managers ] = await db.promise().query("SELECT CONCAT(first_name, ' ', last_name) as name, id as value FROM employee");
    console.log("inside update enployee");

    const answers = await inquirer.prompt([
        {
            name: "employeeName",
            message: "Select employee to update",
            type: "list",
            choices: employees
        },
        {
            name: "newRole",
            message: "What is their new role?",
            type: "list",
            choices: roles
        },
        {
            name: "newManager",
            message: "Select their new manager",
            type: "list",
            choices: managers
        }
    ]);

    const employeeName = (answers["employeeName"]);
    const newRole = (answers["newRole"]);
    const newManager = (answers["newManager"]);

    updateEmployeeQuery(employeeName, newRole, newManager);
};


