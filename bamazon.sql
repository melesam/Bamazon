CREATE DATABASE [IF NOT EXISTS] bamazon;

USE bamazon;

CREATE TABLE products (
	position INTEGER auto_increment NOT NULL,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(10,4) NOT NULL,
	stock_quantity DECIMAL(10,4) NOT NULL,
	PRIMARY KEY (position) 
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pants", "fashion", 30.00, 20), 
("shirts", "fashion", 20.00, 30), 
("shoes", "fashion", 50.00, 10), 
("chairs", "furniture", 75.00, 10), 
("tables", "furniture", 100.00, 8), 
("beds", "furniture", 500.00, 2), 
("microwave", "appliances", 150.00, 20), 
("washer", "appliances", 500.00, 3), 
("dryer", "appliances", 500.00, 3), 
("lawnmower", "garden", 300.00, 5);


