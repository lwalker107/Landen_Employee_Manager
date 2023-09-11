const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const mysql = require('mysql2');

let db = mysql.createConnection(
    {
    host: 'localhost',
    user:'root',
    password: 'layLow99',
    database: 'employee_db',
    },
    console.log('connected to employee db')
);

// Connect to mysql server and sql database
db.connect(function (err) {
    if (err) throw err;
    init();
})

function init() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: [
            { choices: 'View all departments', value: 'ALL_DEPARTMENTS' },
            { choices: 'View all roles', value: 'ALL_ROLES' },
            { choices: 'View all employees', value: 'ALL_EMPLOYEES' },
            { choices: 'Add a department', value: 'ADD_DEPARTMENT' },
            { choices: 'Add an employee role', value: 'ADD_ROLE' },
            { choices: 'Add an employee', value: 'ADD_EMPLOYEE' },
            { choices: 'Update an employee role', value: 'UPDATE_EMPLOYEE' },
            { choices: 'QUIT', value: 'quit'},]
        },
    ]).then((inquirerResponses) => {
        console.log(inquirerResponses.choices);
        switch (inquirerResponses.choices) {
            case 'ALL_DEPARTMENTS':
                viewDepartments();
                break;

            case "ALL_ROLES":
                viewRoles();
                break;

            case "ALL_EMPLOYEES":
                viewEmployees();
                break;

            case "ADD_DEPARTMENT":
                addDepartment();
                break;

            case "ADD_ROLE":
                addRole();
                break;

            case "ADD_EMPLOYEE":
                addEmployee();
                break;

            case "UPDATE_EMPLOYEE":
                updateEmployee();
                break;

            case "quit":
                db.end();
                break;
        }
    });
}

function viewDepartments() {
    db.query("SELECT * FROM department", function(err, data) {
        console.table(data);
        init();
    })
}

function viewRoles() {
    db.query("SELECT * FROM role", function(err, data) {
        console.table(data);
        init();
    })
}

function viewEmployees() {
    db.query("SELECT * FROM employee", function(err, data) {
        console.table(data);
        init();
    })
}

function addDepartment() {
    inquirer.prompt([
        {
           type: "input",
           name: "department",
           message: "What is the name of the department you'd like to add?" 
        },]).then((res) => {
            db.query('INSERT INTO department (department_name) VALUES (?)', [res.department], function(err, data) {
                if (err) throw err;
                console.table("Successfully Inserted");
                init();
            })
        })
}

function addRole() {
    inquirer.prompt([
        {
           type: "input",
           name: "title",
           message: "Enter role title:" 
        }, {
            type: "number",
            name: "salary",
            message: "Enter salary:"
        }, {
            type: "number",
            name: "department_id",
            message: "Enter department ID:"
        }]).then((res) => {
            db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', 
            [res.title, res.salary, res.department_id], function(err, data) {
                if (err) throw err;
                console.table(data);
            })
            init();
        })
}

function addEmployee() {
    inquirer.prompt([{
            type: "input",
            name: "firstName",
            message: "What is the employees first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employees last name?"
        },
        {
            type: "number",
            name: "roleId",
            message: "What is the employees role ID"
        },
        {
            type: "number",
            name: "managerId",
            message: "What is the employees manager's ID?"
        }
    ]).then((res) => {
        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.roleId, res.managerId], function(err, data) {
            if (err) throw err;
            console.table("Successfully Inserted");
            init();
        })
    })
}

function updateEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Which employee would you like to update? (First name only)"

        }, {
            type: "number",
            name: "first_name",
            message: "Enter the new role ID:"
        }
    ]).then((res) => {
        db.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [res.role_id, res.first_name], function (err, data) {
            console.table(data);
        })
        init();
    })

}