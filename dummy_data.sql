USE orders;
INSERT INTO `users` (`name`, `last_name`, `gov_id`, `email`, `company`, `password`, `user_name`)
VALUES ("pepe", "Grillo", "a", "pepe@hotmail.com", "Univalle", "pepe", "pepegrillo");
INSERT INTO `users` (`name`, `last_name`, `gov_id`, `email`, `company`, `password`, `user_name`)
VALUES ("Juancho", "Grillo", "b", "pepe@hotmail.com", "Univalle", "juacho", "pepegrillo");
INSERT INTO `users` (`name`, `last_name`, `gov_id`, `email`, `company`, `password`, `user_name`)
VALUES ("Carracho", "Grillo", "c", "pepe@hotmail.com", "Univalle", "carracho", "pepegrillo");
INSERT INTO `users` (`name`, `last_name`, `gov_id`, `email`, `company`, `password`, `user_name`)
VALUES ("Ponito", "Grillo", "d", "pepe@hotmail.com", "Univalle", "ponito", "pepegrillo");

INSERT INTO `orders` VALUES ("a", "2015-11-05 14:29:36", 125.6, 12.1, true, 1); 
INSERT INTO `orders` VALUES ("a", "2015-11-05 14:29:36", 125.6, 12.1, true, 2); 
INSERT INTO `orders` VALUES ("a", "2015-11-05 14:29:36", 125.6, 12.1, true, 3); 
INSERT INTO `orders` VALUES ("a", "2015-11-05 14:29:36", 125.6, 12.1, true, 4); 
INSERT INTO `orders` VALUES ("a", "2015-11-05 14:29:36", 125.6, 12.1, true, 5); 
INSERT INTO `orders` VALUES ("b", "2015-11-01 14:29:36", 125.6, 12.1, true, 6); 
INSERT INTO `orders` VALUES ("b", "2015-11-01 14:29:36", 125.6, 12.1, true, 7); 
INSERT INTO `orders` VALUES ("b", "2015-11-01 14:29:36", 125.6, 12.1, true, 8); 
INSERT INTO `orders` VALUES ("b", "2015-11-01 14:29:36", 125.6, 12.1, true, 9); 
INSERT INTO `orders` VALUES ("c", "2015-11-01 14:29:36", 125.6, 12.1, true, 10); 
INSERT INTO `orders` VALUES ("c", "2015-11-01 14:29:36", 125.6, 12.1, true, 11); 
INSERT INTO `orders` VALUES ("c", "2015-11-01 14:29:36", 125.6, 12.1, true, 12); 
INSERT INTO `orders` VALUES ("c", "2015-11-01 14:29:36", 125.6, 12.1, true, 13); 
INSERT INTO `orders` VALUES ("c", "2015-11-01 14:29:36", 125.6, 12.1, true, 14); 
INSERT INTO `orders` VALUES ("c", "2015-11-01 14:29:36", 125.6, 12.1, false, 15); 

INSERT INTO `shippings` VALUES ("Calle 6A # 28 - 32", "Cali", "Fontanuto", "Narnia", 0, 1, 1);
INSERT INTO `shippings` VALUES ("Calle 6A # 28 - 32", "Cali", "Fontanuto", "Narnia", 0, 2, 2);
INSERT INTO `shippings` VALUES ("Calle 6A # 28 - 32", "Cali", "Fontanuto", "Narnia", 0, 3, 3);
INSERT INTO `shippings` VALUES ("Calle 6A # 28 - 32", "Cali", "Fontanuto", "Narnia", 0, 4, 4);
INSERT INTO `shippings` VALUES ("Calle 6A # 28 - 32", "Cali", "Fontanuto", "Narnia", 0, 5, 5);
INSERT INTO `shippings` VALUES ("Calle 6A # 28 - 32", "Cali", "Fontanuto", "Narnia", 0, 6, 6);
INSERT INTO `shippings` VALUES ("Calle 6A # 28 - 32", "Cali", "Fontanuto", "Narnia", 0, 7, 7);
INSERT INTO `shippings` VALUES ("Calle 6A # 28 - 32", "Cali", "Fontanuto", "Narnia", 0, 8, 8);
INSERT INTO `shippings` VALUES ("Calle 6A # 28 - 32", "Cali", "Fontanuto", "Narnia", 0, 9, 9);
INSERT INTO `shippings` VALUES ("Calle 6A # 28 - 32", "Cali", "Fontanuto", "Narnia", 0, 10, 10);


INSERT INTO `payments` VALUES ("credit card", "2015-11-01 14:29:36", "foca", 15, true, 1);
INSERT INTO `payments` VALUES ("credit card", "2015-11-01 14:29:36", "gato", 15, false, 2);
INSERT INTO `payments` VALUES ("credit card", "2015-11-01 14:29:36", "cocoa", 15, true, 2);
INSERT INTO `payments` VALUES ("credit card", "2015-11-01 14:29:36", "maria", 15, true, 3);
INSERT INTO `payments` VALUES ("credit card", "2015-11-01 14:29:36", "adios", 15, true, 4);
INSERT INTO `payments` VALUES ("credit card", "2015-11-01 14:29:36", "mundo", 15, true, 5);
INSERT INTO `payments` VALUES ("credit card", "2015-11-01 14:29:36", "cruel", 15, true, 6);
INSERT INTO `payments` VALUES ("credit card", "2015-11-01 14:29:36", "jeje", 15, false, 7);

