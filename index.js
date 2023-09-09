const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const database = require('./db/schema.sql');
const data = require('./db/seeds.sql');


inquirer.prompt([
    {
        type: 'list',
        name: 'database',
        message: 'What would you like to view?',
        choices: ['View all departments', 'View all roles', 'View all employees',
    'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
    },
]).then((inquirerResponses) => {
    let database;
    if (inquirerResponses.database === 'circle') {
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
