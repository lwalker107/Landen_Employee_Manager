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
        },
    ]).then((inquirerResponses) => {
        let database;
        if (inquirerResponses.value === 'ALL_DEPARTMENTS') {
            database = new Circle(inquirerResponses.shapeColor, inquirerResponses.brandInitials, inquirerResponses.textColor)
        }
    
        if (inquirerResponses.database === 'triangle') {
            database = new Triangle(inquirerResponses.shapeColor, inquirerResponses.brandInitials, inquirerResponses.textColor)
        }
    
        if (inquirerResponses.database === 'square') {
            database = new Square(inquirerResponses.shapeColor, inquirerResponses.brandInitials, inquirerResponses.textColor)
        }
    
        shape.setShape(shape.render()) 
        let SVG = shape.renderSVG()
        
        fs.writeFileSync("./logo.svg", SVG)
        console.log("Generated Logo.svg")
    })
}