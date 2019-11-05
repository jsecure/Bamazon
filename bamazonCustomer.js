var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Bedford$1",
  database: "bamazon_DB"
});


start();


function start() {

    connection.connect();
    connection.query('SELECT * from Products', function (error, results) {
        if (error) throw error;
        console.log('Products: ', results);
        takeOrder(connection);

      });
}

// The app should then prompt users with two messages The first should ask them the ID of the product they would like to buy. The second message should ask how many units of the product they would like to buy

// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request. If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.

function takeOrder() {

// Load the NPM Package inquirer


// Create a "Prompt" with a series of questions.
inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "What is the ID of the product you would like to buy?",
      name: "product_ID"
    },
    {
      type: "input",
      message: "What is the amount you would like to buy?",
      name: "quantity"
    },
    // Here we ask the user to confirm.
    {
      type: "confirm",
      message: "Are you sure that you want to buy:",
      name: "confirm",
      default: true
    }
  ])
  .then(function(inquirerResponse) {
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
    if (inquirerResponse.confirm) {
       var item = inquirerResponse.product_ID;
       var quantity = inquirerResponse.quantity;
      
     
      //spmewhere in here you must querty the bamazon sql database and return the item data
      console.log("\nWelcome you want to buy:" + inquirerResponse.product_ID);
      console.log("\nThequantity of your order is"  + inquirerResponse.quantity);
      itemLookup(item, quantity);
    }
    else {
      console.log("You must order something to begin.");
    } 

  }); 
}


  
function itemLookup(item, quantity) {


  connection.query('SELECT * from Products WHERE ItemId=' + item, function (error, results) {
      if (error) throw error;
      console.log('Item result: ', results);

    });
    
}
