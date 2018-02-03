
// require the packages needed
var mysql = require("mysql");
var inquirer = require("inquirer");

// connect to mysql database
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'bamazon'
});
 
connection.connect(function(error){
	 if (error) throw error;

// application will first display all of the items available for sale. 
	 productTable();
})

// Include the ids, names, and prices of products for sale.
var productTable = function() {
	connection.query("SELECT * FROM products", function(error, res) {
		for(var i = 0; i < res.length; i++){
			console.log(res[i].position + " || " + res[i].product_name +" || "+ res[i].department_name +" || "+ res[i].price +" || "+ res[i].stock_quantity +"\n");
		}

// prompt with 2 questions
		promptCustomer(res);
	})
}
// The first should ask them the ID of the product they would like to buy.
var promptCustomer = function(res) {
	inquirer.prompt([{
		type: "input",
		name: "choice",
		message: "What is the ID of the product you would like to buy?"
	}]).then(function(answer){
		var correct = false;

		for(var i=0; i<res.length; i++){
			if(res[i].position == answer.choice){
				correct = true;
	// may need to change name of product and id variables
				var product = answer.choice; 
				var id = i;

// The second message should ask how many units of the product they would like to buy. 
	inquirer.prompt({
		type: "input,"
		name: "quantity",
		message: "How many would you like to buy?",
		validate: function(value){
			if(isNaN(value) == false){
				return true;
			} else {
				return false;
			}
		}
// check if the store has enough of the product to meet the customer's request.	If store does has enough of the product, 
// the customer's order is fullfilled and update the SQL database to reflect the remaining quantity.	
			}).then(function(answer){
				if((res[id].stock_quantity - answer.quantity) >0){
					connection.query("UPDATE products SET stock_quantity = '" +(res[id].stock_quantity - answer.quantity) +"' WHERE product_name = '" +product answer.quantity) +product+ "'", function(error, res2){
						console.log("Product Purchased");
						// productTable function?
						productTable();
					}
				}

// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.				
			}) else {
				console.log("Not a valid selection");
				promptCustomer(res);
			}

			}
		}
	})
}  




// Once the update goes through, show the customer the total cost of their purchase





