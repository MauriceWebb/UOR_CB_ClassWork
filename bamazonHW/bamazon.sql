DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(6, 2) NOT NULL,
  stock_quantity INT,
  PRIMARY KEY (item_id)
);
-- Insert 10 mock products... --
INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES
  ('Shea Butter 8oz', 'skin care', 19.99, 27), -- 1. --
  ('Body Oil 1/3', 'skin care', 4.99, 41), -- 2. --
  ('Loc Butter', 'hair care', 9.99, 13), -- 3. --
  ('Shampoo', 'bath & shower', 9.99, 8), -- 4. --
  ('Liquid Soap', 'bath & shower', 9.99, 16), -- 5. --
  ('Salt Scrub', 'bath & shower', 9.99, 9), -- 6. --
  ('Sugar Scrub', 'bath & shower', 9.99, 7), -- 7. --
  ('Bath Bomb', 'bath & shower', 4.99, 17), -- 8. --
  ('Beard Oil', 'hair care', 9.99, 12), -- 9. --
  ('Lip Balm', 'skin care', 2.99, 31) -- 10. --
;