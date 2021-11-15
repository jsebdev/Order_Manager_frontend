DROP DATABASE IF EXISTS orders_test;
CREATE DATABASE IF NOT EXISTS orders_test;
CREATE USER IF NOT EXISTS 'orders_dev'@'localhost' IDENTIFIED BY 'orders_dev_pwd';
GRANT ALL PRIVILEGES ON `orders_test`.* TO 'orders_dev'@'localhost';
FLUSH PRIVILEGES;

