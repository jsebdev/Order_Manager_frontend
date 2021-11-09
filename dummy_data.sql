USE orders;
INSERT INTO `users` (`id`, `name`, `last_name`, `gov_id`, `email`, `company`, `password`, `user_name`)
VALUES ("a", "pepe", "Grillo", "a", "pepe@hotmail.com", "Univalle", "pepe", "pepegrillo");
INSERT INTO `users` (`id`, `name`, `last_name`, `gov_id`, `email`, `company`, `password`, `user_name`)
VALUES ("b", "Juancho", "Grillo", "b", "pepe@hotmail.com", "Univalle", "juacho", "pepegrillo");
INSERT INTO `users` (`id`, `name`, `last_name`, `gov_id`, `email`, `company`, `password`, `user_name`)
VALUES ("c", "Carracho", "Grillo", "c", "pepe@hotmail.com", "Univalle", "carracho", "pepegrillo");
INSERT INTO `users` (`id`, `name`, `last_name`, `gov_id`, `email`, `company`, `password`, `user_name`)
VALUES ("d", "Ponito", "Grillo", "d", "pepe@hotmail.com", "Univalle", "ponito", "pepegrillo");

INSERT INTO `orders` VALUES ("o1", "a", "2015-11-05 14:29:36", 125.6, 12.1, true); 
INSERT INTO `orders` VALUES ("o2", "a", "2015-11-05 14:29:36", 125.6, 12.1, true); 
INSERT INTO `orders` VALUES ("o3", "a", "2015-11-05 14:29:36", 125.6, 12.1, true); 
INSERT INTO `orders` VALUES ("o4", "a", "2015-11-05 14:29:36", 125.6, 12.1, true); 
INSERT INTO `orders` VALUES ("o5", "a", "2015-11-05 14:29:36", 125.6, 12.1, true); 
INSERT INTO `orders` VALUES ("o6", "b", "2015-11-01 14:29:36", 125.6, 12.1, true); 
INSERT INTO `orders` VALUES ("o7", "b", "2015-11-01 14:29:36", 125.6, 12.1, true); 
INSERT INTO `orders` VALUES ("o8", "b", "2015-11-01 14:29:36", 125.6, 12.1, true); 
INSERT INTO `orders` VALUES ("o9", "b", "2015-11-01 14:29:36", 125.6, 12.1, true); 
INSERT INTO `orders` VALUES ("o10", "c", "2015-11-01 14:29:36", 125.6, 12.1, true); 
INSERT INTO `orders` VALUES ("o11", "c", "2015-11-01 14:29:36", 125.6, 12.1, true); 
INSERT INTO `orders` VALUES ("o12", "c", "2015-11-01 14:29:36", 125.6, 12.1, true); 
INSERT INTO `orders` VALUES ("o13", "c", "2015-11-01 14:29:36", 125.6, 12.1, true); 
INSERT INTO `orders` VALUES ("o15", "c", "2015-11-01 14:29:36", 125.6, 12.1, true); 
INSERT INTO `orders` VALUES ("o16", "c", "2015-11-01 14:29:36", 125.6, 12.1, false); 

INSERT INTO `shippings` VALUES ("s1", "Calle 6A # 28 - 32", "Cali", "Fontanuto", "Narnia", 0, "o1");
INSERT INTO `shippings` VALUES ("s2", "Calle 6A # 28 - 32", "Cali", "Fontanuto", "Narnia", 0, "o2");
INSERT INTO `shippings` VALUES ("s3", "Calle 6A # 28 - 32", "Cali", "Fontanuto", "Narnia", 0, "o3");
INSERT INTO `shippings` VALUES ("s4", "Calle 6A # 28 - 32", "Cali", "Fontanuto", "Narnia", 0, "o4");
INSERT INTO `shippings` VALUES ("s5", "Calle 6A # 28 - 32", "Cali", "Fontanuto", "Narnia", 0, "o5");
INSERT INTO `shippings` VALUES ("s6", "Calle 6A # 28 - 32", "Cali", "Fontanuto", "Narnia", 0, "o6");
INSERT INTO `shippings` VALUES ("s7", "Calle 6A # 28 - 32", "Cali", "Fontanuto", "Narnia", 0, "o7");
INSERT INTO `shippings` VALUES ("s8", "Calle 6A # 28 - 32", "Cali", "Fontanuto", "Narnia", 0, "o8");
INSERT INTO `shippings` VALUES ("s9", "Calle 6A # 28 - 32", "Cali", "Fontanuto", "Narnia", 0, "o9");
INSERT INTO `shippings` VALUES ("s10", "Calle 6A # 28 - 32", "Cali", "Fontanuto", "Narnia", 0, "o10");


INSERT INTO `payments` VALUES ("p1", "credit card", "2015-11-01 14:29:36", "foca", 15, true, "o1");
INSERT INTO `payments` VALUES ("p2", "credit card", "2015-11-01 14:29:36", "gato", 15, false, "o2");
INSERT INTO `payments` VALUES ("p3", "credit card", "2015-11-01 14:29:36", "cocoa", 15, true, "o3");
INSERT INTO `payments` VALUES ("p4", "credit card", "2015-11-01 14:29:36", "maria", 15, true, "o4");
INSERT INTO `payments` VALUES ("p5", "credit card", "2015-11-01 14:29:36", "adios", 15, true, "o5");
INSERT INTO `payments` VALUES ("p6", "credit card", "2015-11-01 14:29:36", "mundo", 15, true, "o6");
INSERT INTO `payments` VALUES ("p7", "credit card", "2015-11-01 14:29:36", "cruel", 15, true, "o6");
INSERT INTO `payments` VALUES ("p8", "credit card", "2015-11-01 14:29:36", "jeje", 15, false, "o6");

