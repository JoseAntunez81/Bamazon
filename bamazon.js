require("dotenv").config();
var fs = require('fs');
var keys = require("./keys.js");
var mysql = require("mysql");
var inquirer = require("inquirer");
var password = (keys.password);



var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "DB_PASS",
    database: "bamazon_DB"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
  });
  
//This fucntion will prompt the user for the item they would like to purchase
function selectItem() {
// Prompt the user to select an item
	inquirer.prompt([{
			type: "input",
			name: "item_id",
			message: "What would you like to buy today?",
			
		},
		{
			type: "input",
			name: "quantity",
			message: "How many items would you like to get?",
			
		}
	]).then(function(input) {
		

		var item = input.item_id;
		var quantity = input.quantity;

		// Query db to confirm that the given item ID exists in the desired quantity
		var query = "SELECT * FROM products WHERE ?";

		connection.query(query, {item_id: item}, function(err, data) {
			if (err) throw err;

		 else if (data.length === 0) {
			console.log("ERROR!!!!!!! Please select a valid Item ID from the list.");
			storeInventory();

        } else {
        var productData = data[0];

	

    
    if (quantity <= productData.stock_quantity) {
        console.log("Very nice, the product selected is in stock");

        // Here is the query update
        var updateQuery = "UPDATE products SET stock_quantity = " + stockQuantity + " WHERE item_id = " + item;
        var stockQuantity  = productData.stock_quantity - quantity,
        var total = productData.price * quantity;
        // Update the inventory
        connection.query(updateQuery, function(err, data) {
            if (err) throw err;

            console.log("Thank you for your order! Your total is $" + total);
            console.log("Thank you for choosing us as a store");
            console.log("Come back soon");
            console.log("\n----------------------------------\n");

            // End the database connection
            connection.end();
        })
    } else {
        console.log("Sorry this item is out of stock at the moment");
        console.log("You could select something similar\n or we could send you and email when your product comes back")
        console.log("\n----------------------------------\n");
        storeInventory();
            }
        }
    })
 })
}


function storeInventory() {
    query = "SELECT * FROM products";
    connection.query(query, function(err, data) {
		if (err) throw err;

		console.log("This is our current inventory: " );
		console.log('...................\n');

		var inventory = '';
		for (var i = 0; i < data.length; i++) {
			inventory = '';
			inventory += 'Item ID: ' + data[i].item_id + '  //  ';
			inventory += 'Product Name: ' + data[i].product_name + '  //  ';
			inventory += 'Department: ' + data[i].department_name + '  //  ';
			inventory += 'Price: $' + data[i].price + '\n';

			console.log(inventory);
		}
    //User can make a selction again
        selectItem();
	})
}

//start function runs the app 
function start() {
	storeInventory();
}
start();