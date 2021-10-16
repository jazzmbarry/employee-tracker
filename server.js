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
    const sql = 'SELECT id AS ID, department_name AS Name FROM department;'

    connection.promise().query(sql)
    .then(results => {
        console.table(results[0])
        startManager()
    })
    .catch(err => {
        if (err) throw err
    })
}

showRoles = () => {
    console.log('Showing all departments   \n')
    const sql = `
    SELECT 
    role.id AS ID, 
    role.title AS Title, 
    role.salary as Salary, 
    department.department_name AS Department 
    FROM role 
    JOIN department ON role.department_id = department.id
    ;`

    connection.promise().query(sql)
    .then(results => {
        console.table(results[0])
        startManager()
    })
    .catch(err => {
        if (err) throw err
    })

}

showEmployees = () => {
    console.log('Showing all departments   \n')
    const sql = `
    SELECT 
        employee.id AS ID, 
        employee.first_name AS First_Name, 
        employee.last_name AS Last_Name,  
        role.title AS Title,
        CONCAT (manager.first_name, ' ', manager.last_name) AS Manager
    FROM 
        employee 
    INNER JOIN 
        role ON role.id = employee.role_id
    LEFT JOIN
        employee manager ON employee.manager_id = manager.id
    ;`

    connection.promise().query(sql)
    .then(results => {
        console.table(results[0])
        startManager()
    })
    .catch(err => {
        if (err) throw err
    })

}

addDepartments = () => {
    console.log('Showing all departments   \n')
    const sql = 'SELECT id AS ID, department_name AS Name FROM department'

    connection.promise().query(sql)
    .then(results => {
        console.table(results)
        startManager()
    })
    .catch(err => {
        if (err) throw err
    })

}

addRole = () => {
    console.log('Showing all departments   \n')
    const sql = 'SELECT id AS ID, department_name AS Name FROM department'

    connection.promise().query(sql)
    .then(results => {
        console.table(results)
        startManager()
    })
    .catch(err => {
        if (err) throw err
    })

}

addEmployee = () => {
    console.log('Showing all departments   \n')
    const sql = 'SELECT id AS ID, department_name AS Name FROM department'

    connection.promise().query(sql)
    .then(results => {
        console.table(results)
        startManager()
    })
    .catch(err => {
        if (err) throw err
    })

}

updateEmployeeRole = () => {
    console.log('Showing all departments   \n')
    const sql = 'SELECT id AS ID, department_name AS Name FROM department'

    connection.promise().query(sql)
    .then(results => {
        console.table(results)
        startManager()
    })
    .catch(err => {
        if (err) throw err
    })

}

showEmployeesByManager = () => {
    console.log('Showing all departments   \n')
    const sql = 'SELECT id AS ID, department_name AS Name FROM department'

    connection.promise().query(sql)
    .then(results => {
        console.table(results)
        startManager()
    })
    .catch(err => {
        if (err) throw err
    })

}

showEmployeesByDepartment = () => {
    console.log('Showing all departments   \n')
    const sql = 'SELECT id AS ID, department_name AS Name FROM department'

    connection.promise().query(sql)
    .then(results => {
        console.table(results)
        startManager()
    })
    .catch(err => {
        if (err) throw err
    })

}

deleteDepartment = () => {
    console.log('Showing all departments   \n')
    const sql = 'SELECT id AS ID, department_name AS Name FROM department'

    connection.promise().query(sql)
    .then(results => {
        console.table(results)
        startManager()
    })
    .catch(err => {
        if (err) throw err
    })

}

deleteRole = () => {
    console.log('Showing all departments   \n')
    const sql = 'SELECT id AS ID, department_name AS Name FROM department'

    connection.promise().query(sql)
    .then(results => {
        console.table(results)
        startManager()
    })
    .catch(err => {
        if (err) throw err
    })

}

deleteEmployee = () => {
    console.log('Showing all departments   \n')
    const sql = 'SELECT id AS ID, department_name AS Name FROM department'

    connection.promise().query(sql)
    .then(results => {
        console.table(results)
        startManager()
    })
    .catch(err => {
        if (err) throw err
    })

}

showBudget = () => {
    console.log('Showing all departments   \n')
    const sql = 'SELECT id AS ID, department_name AS Name FROM department'

    connection.promise().query(sql)
    .then(results => {
        console.table(results)
        startManager()
    })
    .catch(err => {
        if (err) throw err
    })

}
