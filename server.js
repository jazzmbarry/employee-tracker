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
    console.log('Showing all roles   \n')
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
    console.log('Showing all employees   \n')
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
    console.log('Add a department   \n')
    inquirer.prompt([
        {
            type: 'input',
            name: 'addDept',
            message: 'What department would you like to add?'
        }
    ])
    .then( answer  => {
    const sql = `
    INSERT INTO department (department_name) 
    VALUES ('${answer.addDept}');
    `
    connection.promise().query(sql)
})
    .then(results => {
        console.table(results)
        showDepartments()
    })
    .catch(err => {
        if (err) throw err
    })

}

addRole = () => {
    console.log('Add a role   \n')
    inquirer.prompt([
        {
            type: 'input',
            name: 'addRole',
            message: 'What role would you like to add?'
        }
        ,
        {
            type: 'input',
            name: 'salary',
            message: "What is this role's salary?"
        }
        ,
        {
            type: "list",
            name: "dept",
            message: "What dept is this role in?",
            choices: [
                "1",
                "2",
                "3",
                "4"
            ]
        }
    ])
    .then( answer  => {
    const sql = `
    INSERT INTO role (title, salary, department_id) 
    VALUES ('${answer.addRole}', ${answer.salary}, ${answer.dept});
    `
    connection.promise().query(sql)
})
    .then(results => {
        console.table(results)
        showRoles()
    })
    .catch(err => {
        if (err) throw err
    })

}

addEmployee = () => {
    console.log('Add an employee   \n')
    inquirer.prompt([
        {
            type: 'input',
            name: 'first',
            message: 'What is the first name of the employee you would like to add?'
        }
        ,
        {
            type: 'input',
            name: 'last',
            message: 'What is the last name of the employee you would like to add?'
        }
        ,
        {
            type: 'input',
            name: 'role_id',
            message: 'What is their role ID?'
        }
        ,
        {
            type: 'input',
            name: 'manager_id',
            message: "What is their manager's ID?"
        }
        ,
    ])
    .then( answer  => {
    const sql = `
    INSERT INTO employee (first_name, last_name, role_id, manager_id) 
    VALUES ('${answer.first}', '${answer.last}', ${answer.role_id}, ${answer.manager_id});
    `
    connection.promise().query(sql)
})
    .then(results => {
        console.table(results)
        showEmployees()
    })
    .catch(err => {
        if (err) throw err
    })

}

// You update your manager through the updateEmployeeRole
updateEmployeeRole = () => {
    console.log('Showing all departments   \n')
    const sql = 'SELECT id AS ID, first_name, last_name FROM employee'

    connection.promise().query(sql)
    .then(results => {
        console.table(results[0])
        inquirer.prompt([
            {
                type: 'input',
                name: 'id',
                message: 'What is the ID number of this employee?'
            }
            ,
            {
                type: 'input',
                name: 'role',
                message: 'What is their new role ID?'
            }
            ,
            {
                type: 'input',
                name: 'manager',
                message: "What is their new (or exisiting if the same) manager's ID?"
            }
        ])
        .then(answer =>{
            const inq = `
            UPDATE employee
            SET role_id = ${answer.role}, manager_id = ${answer.manager}
            WHERE id = ${answer.id}
            `

            connection.promise().query(inq)
            showEmployees()            
        })
    })
    .catch(err => {
        if (err) throw err
    })

}

showEmployeesByManager = () => {
    console.log('Showing all departments   \n')
    const sql =` 
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name
    FROM employee
    INNER JOIN role ON role.id = employee.role_id
    LEFT JOIN department ON department.id = role.department_id
    WHERE department.department_name = 'Management'
`
    connection.promise().query(sql)
    .then(results => {
        console.table(results[0])
        inquirer.prompt([
            {
                type: 'input',
                name: 'idNum',
                message: "Select by ID which manager's employees you want to see."
            }
        ])
        .then(answer => {
            const inq = `
            SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name
            FROM employee
            INNER JOIN role ON role.id = employee.role_id
            LEFT JOIN department ON department.id = role.department_id
            WHERE manager_id = ${answer.idNum}
                `
            connection.promise().query(inq)
            .then(result2 =>{
                console.table(result2[0])
            })
        })

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
        console.table(results[0])
        inquirer.prompt([
            {
                type: 'input',
                name: 'inNum',
                message: 'By ID, which department would you like to look at?'
            }
        ])
        .then(answer =>{
            const inq = `
            SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name
            FROM employee
            INNER JOIN role ON role.id = employee.role_id
            LEFT JOIN department ON department.id = role.department_id
            WHERE department_id = ${answer.inNum}     
            `

            connection.promise().query(inq)
            .then(result2 => {
                console.table(result2[0])
                startManager()
            })
        })
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
