DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department_table (
    id INT PRIMARY KEY,
    department_name VARCHAR(30)
);

CREATE TABLE role_table (
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT
    FOREIGN KEY (department_id) REFERENCES department_table(id)
);

CREATE TABLE employee_table (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES role_table(id)
);

