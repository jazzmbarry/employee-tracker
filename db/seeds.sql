-- Adding Departments
INSERT INTO department (department_name)
VALUES ('Management');

INSERT INTO department (department_name)
VALUES ('Sales');

INSERT INTO department (department_name)
VALUES ('IT');

INSERT INTO department (department_name)
VALUES ('Human Resources');

-- Management Team Roles
INSERT INTO role (title, salary, department_id)
VALUES ("General Manager", 100000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 80000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("IT Manager", 80000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("HR Manager", 80000, 1);

-- Sales Team Roles
INSERT INTO role (title, salary, department_id)
VALUES ("Salesman", 60000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Stocker", 60000, 2);

-- IT Team Roles
INSERT INTO role (title, salary, department_id)
VALUES ("Senior Dev", 70000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Junior Dev", 60000, 3);

-- HR Team Roles
INSERT INTO role (title, salary, department_id)
VALUES ("Public Relations", 70000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("Marketing", 70000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("Internal Resources", 70000, 4);

-- Employees (One Per Role for seed)

-- Managers Seeds
-- General Manager
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Steven", "Hall", 1, NULL);
-- Sales Manager
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rebecca", "Harris", 2, 1);
-- IT Manager
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Joe", "Black", 3, 1);
-- HR Manager
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Adam", "Christopherson", 4, 1);

-- Sales Seeds
-- Salesman
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Barry", "Allen", 5, 2);
-- Stocker
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Chris", "Decker", 6, 2);

-- IT Seeds
-- Senior Dev
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Derick", "Billards", 7, 3);
-- Junior Dev
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ellen", "Has", 8, 3);

-- HR Seeds
-- PR
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Frank", "Abignale", 9, 4);
-- Marketing
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Gary", "Tilley", 10, 4);
-- Internal Resources
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Hillary", "Webber", 11, 4);


