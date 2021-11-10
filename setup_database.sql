DROP DATABASE IF EXISTS orders;
CREATE DATABASE IF NOT EXISTS orders;
CREATE USER IF NOT EXISTS 'orders_dev'@'localhost' IDENTIFIED BY 'orders_dev_pwd';
GRANT ALL PRIVILEGES ON `orders`.* TO 'orders_dev'@'localhost';
FLUSH PRIVILEGES;

-- USE hbtn_orders;

-- CREATE TABLE IF NOT EXISTS `users` (
  -- `name` varchar(50),
  -- `last_name` varchar(50),
  -- `gov_id` varchar(50),
  -- `email` varchar(100),
  -- `company` varchar(50),
  -- `password` varchar(50),
  -- `user_name` varchar(50),
  -- PRIMARY KEY (`gov_id`)
-- );

-- CREATE TABLE IF NOT EXISTS `orders` (
  -- `user_id` varchar(50),
  -- `date` datetime,
  -- `subtotal` float,
  -- `taxes` float,
  -- `paid` bool,
  -- `order_id` int,
  -- PRIMARY KEY (`order_id`),
  -- FOREIGN KEY (`user_id`) REFERENCES `users`(`gov_id`)
-- );

-- CREATE TABLE IF NOT EXISTS `shippings` (
  -- `address` varchar(80),
  -- `city` varchar(50),
  -- `state` varchar(50),
  -- `country` varchar(50),
  -- `cost` float,
  -- `order_id` int,
  -- FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`)
-- );

-- CREATE TABLE IF NOT EXISTS `payments` (
  -- `type` varchar(50),
  -- `date` datetime,
  -- `txn_id` varchar(20),
  -- `total` float,
  -- `delivered` bool,
  -- `order_id` int,
  -- PRIMARY KEY (`txn_id`),
  -- FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`)
-- );




