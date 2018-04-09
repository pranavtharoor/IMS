CREATE TABLE IF NOT EXISTS users(
	user_id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	password VARCHAR(70) NOT NULL,
	email VARCHAR(40) NOT NULL UNIQUE,
	type INT DEFAULT 0 NOT NULL,
	status INT DEFAULT 1 NOT NULL
);
CREATE TABLE IF NOT EXISTS categories(
	category_id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL UNIQUE,
	status INT DEFAULT 1 NOT NULL
);
CREATE TABLE IF NOT EXISTS brands(
	brand_id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL UNIQUE,
	status INT DEFAULT 1 NOT NULL
);
CREATE TABLE IF NOT EXISTS orders(
	order_id INT AUTO_INCREMENT PRIMARY KEY,
	customer_name VARCHAR(50) NOT NULL,
	order_date TIMESTAMP DEFAULT NOW() NOT NULL,
	gst DECIMAL(4, 2) NOT NULL,
	discount DECIMAL(4, 2) NOT NULL,
	paid DECIMAL(12, 2) NOT NULL,
	sub_total DECIMAL(12, 2) NOT NULL,
	net_total DECIMAL(12, 2) NOT NULL
);
CREATE TABLE IF NOT EXISTS products(
	product_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	category_id INT NOT NULL,
	brand_id INT NOT NULL,
	price DECIMAL(9, 2) NOT NULL,
	stock DECIMAL(9, 2) NOT NULL,
	status INT DEFAULT 1 NOT NULL,
	FOREIGN KEY (category_id) REFERENCES categories(category_id),
	FOREIGN KEY (brand_id) REFERENCES brands(brand_id),
	UNIQUE (name, category_id, brand_id)
);
CREATE TABLE IF NOT EXISTS order_details(
	od_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	order_id INT NOT NULL,
	product_id INT NOT NULL,
	quantity DECIMAL(6, 2) NOT NULL,
	price DECIMAL(9, 2) NOT NULL,
	FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
	FOREIGN KEY (product_id) REFERENCES products(product_id)
);

DELIMITER $$
 
CREATE FUNCTION check_stock(v_stock DECIMAL(9, 2)) RETURNS INTEGER
    DETERMINISTIC
BEGIN 
    IF v_stock > 0 THEN
 		RETURN 1;
 	ELSE
 		RETURN 0;
    END IF;
	RETURN 0;
END$$

CREATE TRIGGER order_placed
BEFORE INSERT ON order_details
FOR EACH ROW
BEGIN
	DECLARE v_stock DECIMAL(9, 2) DEFAULT 0;
	DECLARE v_price DECIMAL(9, 2);
	SELECT stock, price INTO v_stock, v_price
	FROM products
	WHERE product_id = NEW.product_id;
	SET v_stock := v_stock - NEW.quantity;
	IF check_stock(v_stock) = 0 OR NEW.price <> v_price THEN
		SET NEW.price := NULL;
		SET NEW.quantity := NULL;
	ELSE
		UPDATE products
		SET stock = v_stock
		WHERE product_id = NEW.product_id;
	END IF;
END$$

DELIMITER ;