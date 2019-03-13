DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL (10,3),
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);



INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("MacBook Pro 15", Computers, 3250.68, 50),
("Dell inspiron 15", Computers, 1935.99, 50),
("MacBook Air", Computers, 2260.80, 50),
("Kobe ADT", Shoes, 120.99, 20),
("Air Jordan", Shoes, 200.00, 32),
("Gucci Sneakers", Shoes, 350.85, 25),
("Armani T-shirt", Clothing, 150, 75), 
("Mossimo Jeans", Clothing, 49.99, 100),
("Levi's Jeans", Clothing, 79.99, 100),
("Diesel Jeans", Clothing, 250.75, 100)

 -- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Ja15665207$'