const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
})

connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId)
    connected();
})

connected = () => {
    console.log(
        `
         ________________________
        |                        |
        |                        |
        |    EMPLOYEE MANAGER    |
        |                        |
        |                        |
        |________________________|
        `
    )
    startManager();
}

const startManager = () => {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Update employee managers',
            'View employees by manager',
            'View employees by department',
            'Delete a department',
            'Delete a role',
            'Delete an employee',
            'View Budget',
            'No Action'
        ]
    }
])
    .then((answer) => {
        const { menu } = answer

        if (menu === 'View all departments') {
            showDepartments()
        }

        if (menu === 'View all roles') {
            showRoles()
        }

        if (menu === 'View all employees') {
            showEmployees()
        }

        if (menu === 'Add a department') {
            addDepartments()
        }

        if (menu === 'Add a role') {
            addRole()
        }

        if (menu === 'Add an employee') {
            addEmployee()
        }

        if (menu === 'Update an employee role') {
            updateEmployeeRole()
        }

        if (menu === 'View employees by manager') {
            showEmployeesByManager()
        }

        if (menu === 'View employees by department') {
            showEmployeesByDepartment()
        }

        if (menu === 'Delete a department') {
            deleteDepartment()
        }

        if (menu === 'Delete a role') {
            deleteRole()
        }

        if (menu === 'Delete an employee') {
            deleteEmployee()
        }

        if (menu === 'View Budget') {
            showBudget()
        }

        if (menu === 'No Action') {
            connection.end()
        }    
    })
}

const showDepartments = () => {
    console.log('Showing all departments   \n')
    const sql = 'SELECT id AS ID, department_name AS Name FROM department_table'

    connection.promise().query(sql)
    .then(results => {
        console.table(results)
        startManager()
    })
    .catch(err => {
        if (err) throw err
    })
}

showRoles = () => {

}

showEmployees = () => {

}

addDepartments = () => {

}

addRole = () => {

}

addEmployee = () => {

}

updateEmployeeRole = () => {

}

showEmployeesByManager = () => {

}

showEmployeesByDepartment = () => {

}

deleteDepartment = () => {

}

deleteRole = () => {

}

deleteEmployee = () => {

}

showBudget = () => {

}
