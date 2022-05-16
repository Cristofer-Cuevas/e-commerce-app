CREATE DATABASE e-commerce-app;

CREATE TABLE purchased_products (
	id SERIAL PRIMARY KEY,
	user_id uuid NOT NULL, 
	product_id int, 
	price numeric,
	quantity int,
	image text,
	date text
);

CREATE TABLE credits (
	user_id uuid NOT NULL,
	credit numeric
);