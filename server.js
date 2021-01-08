const inquirer = require("inquirer");
const mysql = require("mysql");
const { listenerCount, allowedNodeEnvironmentFlags } = require("process");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  // port
  port: 3306,

  // username
  user: "root",

  // password
  password: "Corn119!",
  database: "employeetracker_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
    menuOptions()
});

function menuOptions() {
  inquirer
    .prompt({
      type: "list",
      name: "menu",
      message: "What would you like to do?",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View department",
        "View role",
        "View employee",
        "Update employee role",
      ],
    })
    .then(function (answer) {
      switch (answer.menu) {
        case "Add department":
            addDepartment();
          //add function callback for Add department function;
          break;
        case "Add role":
            addRole();
          //add
          break;
        case "Add employee":
            addEmployee();
          //add break
          break;
        case "View department":
            viewDepartment();
          //
          break;
          case "View role":
              viewRole();
          //add break
          break;
        case "View employee":
            viewEmployee();
          //
          break;
          case "Update employee role":
            updateEmployeeRole();
          //
          break;
      }
    });
}
function viewDepartment(){
    connection.query("SELECT * FROM department", (err, res) => {
        console.table(res);
        menuOptions();
      });
}

function addDepartment(){
    inquirer
    .prompt({
      type: "input",
      name: "department",
      message: "What department name?",
    })
    .then(function (answer){
        connection.query("INSERT INTO department (name) VALUES (?);", [answer.department], (err, res) => {
            console.log(err);
            console.table(res);
            menuOptions();
          });
    })
}

function addRole(){
    inquirer
    .prompt([{
      type: "input",
      name: "role",
      message: "What is the name of the role you are adding?",
    }, {
        type: "input",
      name: "salary",
      message: "What is the salary amount?",
    }, {
        type: "input",
      name: "department_id",
      message: "Specify the department",
    }])
    .then(function (answer){
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);", [answer.role, answer.salary, answer.department_id], (err, res) => {
            console.log(err);
            console.table(res);
            menuOptions();
          });
    })
}

function addEmployee(){
    inquirer
    .prompt([{
      type: "input",
      name: "firstName",
      message: "Enter the employees first name",
    }, {
        type: "input",
      name: "lastName",
      message: "Enter the employees last name",
    }, {
        type: "input",
      name: "roleId",
      message: "Enter the employees role ID",
    }, {
        type: "input",
      name: "managerId",
      message: "Enter the employees manager ID",
    }])
    .then(function (answer){
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);", [answer.firstName, answer.lastName, answer.roleId, answer.managerId], (err, res) => {
            console.log(err);
            console.table(res);
            menuOptions();
          });
    })
}

function viewRole(){
    connection.query("SELECT * FROM role", (err, res) => {
        console.table(res);
        menuOptions();
      });
}

function viewEmployee(){
    connection.query("SELECT * FROM employee", (err, res) => {
        console.table(res);
        menuOptions();
      });
}

function updateEmployeeRole(){
    inquirer.prompt([
        {
            type: "input",
            name: "employeeId",
            message: "What is the ID of the employee you would like to update?"
        },
        {
            type: "input",
            name: "employeeRole",
            message: "What is the role you would like to update to?"
        },
    ]) .then(function(answer){
        connection.query(
            "UPDATE employee SET ? WHERE ?",
    [
      {
        role_id: answer.employeeRole
      },
      {
        id: answer.employeeId
      }
    ],
        function(err, res){
            if (err) throw err;
            console.table(res)
            menuOptions();
        }

        )
    })
}