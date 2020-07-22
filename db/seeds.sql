USE wine_key;

DROP TABLE IF EXISTS restaurants;
CREATE TABLE restaurants
(id INT NOT NULL AUTO_INCREMENT,
restaurantName VARCHAR(255) NOT NULL,
phoneNumber VARCHAR(30) NOT NULL,
address VARCHAR(60) NOT NULL,
primary key (id)
);

INSERT INTO restaurants (restaurantName, phoneNumber, address) VALUES ("El Gaucho Seattle", "(206)728-1337", "2505 1st Ave, Seattle, WA 98121");
INSERT INTO restaurants (restaurantName, phoneNumber, address) VALUES ("El Gaucho Bellevue", "(425)455-2715", "450 108th Ave NE, Bellevue, WA 98004");
INSERT INTO restaurants (restaurantName, phoneNumber, address) VALUES ("El Gaucho Tacoma", "(253)272-1510", "2119 Pacific Ave, Tacoma, WA 98402");
INSERT INTO restaurants (restaurantName, phoneNumber, address) VALUES ("Aerlume Seattle", "(206)539-2200", "2003 Western Ave Suite C, Seattle, WA 98121");
INSERT INTO restaurants (restaurantName, phoneNumber, address) VALUES ("Aqua by El Gaucho", "(206)956-9171", "2801 Alaskan Way, Seattle, WA 98121");
