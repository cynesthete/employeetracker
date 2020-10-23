const inquirer = require("inquirer")
const mysql = require("mysql");
const { listenerCount } = require("process");
require("console.table")

var connection = mysql.createConnection({
    host: "localhost",
  
    // port
    port: 3306,
  
    // username
    user: "root",
  
    // password
    password: "Corn119!",
    database: "employeetracker_db"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
  });

  function menuOptions(){
      inquirer.prompt({
          type: "list",
          name: "menu",
          message: "What would you like to do?",
          choices: ["Add department", "Add role", "Add employee", "View department", "View role", "View employee", "Update employee role"]
      }).then(function(answer){
          switch(answer.menu){
              case "Add department":
                  //add function callback for Adddepartment function;
                case "Add role":
                    //add
                    case "Add employee":
                        //add
                        case "View department":
                            //
          }
      })
  };