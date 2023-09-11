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
            { choices: 'View all departments', value: 'View all departments' },
            { choices: 'View all roles', value: 'View all roles' },
            { choices: 'View all employees', value: 'View all employees' },
            { choices: 'Add a department', value: 'Add a department' },
            { choices: 'Add an employee role', value: 'Add an employee role' },
            { choices: 'Add an employee', value: 'Add an employee' },
            { choices: 'Update an employee role', value: 'Update an employee role' },
            { choices: 'Delete a department', value: 'Delete a department'},
            { choices: 'Delete an employee', value: 'Delete an employee'},
            { choices: 'Delete a role', value: 'Delete a role'},
            { choices: 'QUIT', value: 'quit'},]
        },
    ]).then((inquirerResponses) => {
        console.log(inquirerResponses.choices);
        switch (inquirerResponses.choices) {
            case 'View all departments':
                viewDepartments();
                break;

            case "View all roles":
                viewRoles();
                break;

            case "View all employees":
                viewEmployees();
                break;

            case "Add a department":
                addDepartment();
                break;

            case "Add an employee role":
                addRole();
                break;

            case "Add an employee":
                addEmployee();
                break;

            case "Update an employee role":
                updateEmployee();
                break;

            case "Delete a department":
                deleteDepartment();
                break;

            case "Delete an employee":
                deleteEmployee();
                break;

            case "Delete a role":
                deleteRole();
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
            name: "firstName",
            message: "Which employee would you like to update? (First name only)"

        }, {
            type: "number",
            name: "roleId",
            message: "Enter the new role ID:"
        }
    ]).then((res) => {
        db.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [res.roleId, res.firstName], function (err, data) {
            console.table(data);
        })
        init();
    })

}

function deleteDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "What department would you like to delete?"
        },
    ]).then((res) => {
        db.query("DELETE FROM department WHERE department_name = ?", [res.department], function (err,data) {
            console.log('Department successfully deleted');
        })
        init();
    })
}

function deleteEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "Which employee would you like to delete from the database? (First name only)"
        },
    ]).then((res) => {
        db.query("DELETE FROM employee WHERE first_name = ?", [res.firstName], function (err,data) {
            console.log('Employee successfully terminated');
        })
        init();
    })
}

function deleteRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "role",
            message: "What role would you like to delete?"
        },
    ]).then((res) => {
        db.query("DELETE FROM role WHERE title = ?", [res.role], function (err,data) {
            console.log('Role successfully deleted');
        })
        init();
    })
}