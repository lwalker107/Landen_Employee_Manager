const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const mysql = require('mysql2');

db = mysql.createConnection(
    {
    host: 'localhost',
    user:'root',
    password: '',
    datqabase: 'employee_db',
    },
    console.log('connected to employee db')
);

function init() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: [
            { choice: 'View all departments', value: 'ALL_DEPARTMENTS' },
            { choice: 'View all roles', value: 'ALL_ROLES' },
            { choice: 'View all employees', value: 'ALL_EMPLOYEES' },
            { choice: 'Add a department', value: 'ADD_DEPARTMENT' },
            { choice: 'Add an employee role', value: 'ADD_ROLE' },
            { choice: 'Add an employee', value: 'ADD_EMPLOYEE' },
            { choice: 'Update an employee role', value: 'UPDATE_EMPLOYEE' },
            { choice: 'QUIT', value: 'quit'},
        },
    ]).then((inquirerResponses) => {
        console.log(inquirerResponses.value);
        switch (inquirerResponses.value) {
            case "ALL_DEPARTMENTS":
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

            case "UPDATED_EMPLOYEE":
                updateEmployee();
                break;
        }
    })
}