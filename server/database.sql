CREATE DATABASE e-commerce-app;

CREATE TABLE cart_products (
	user_id uuid,
		product_id numeric,
	quantity numeric
);

CREATE TABLE purchased_products (
	user_id uuid NOT NULL, 
	product_id int, 
	price numeric,
	quantity int,
	date text
);

CREATE TABLE credits (
	user_id uuid NOT NULL,
	credit numeric
);