-- CREATE DATABASE 4all_database;
-- SET GLOBAL validate_password.policy=LOW; 
-- CREATE USER '4all_user'@'localhost' IDENTIFIED WITH mysql_native_password BY '4all_password'; 
-- GRANT ALL PRIVILEGES ON 4all_database.* TO '4all_user'@'localhost'; 
-- FLUSH PRIVILEGES;

SET character_set_client = utf8;
SET character_set_connection = utf8;
SET character_set_results = utf8;
SET collation_connection = utf8_general_ci;

CREATE TABLE user(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(60) NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE user_has_token(
  token VARCHAR(255) NOT NULL UNIQUE,
  is_connected TINYINT(1) NOT NULL DEFAULT 1,
  last_access_date DATETIME NOT NULL,
  id_user INT NOT NULL,
  FOREIGN KEY (id_user) REFERENCES user(id)
);

CREATE TABLE rental_store(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255)
);

INSERT INTO rental_store(name) VALUES('Blockbuster Inc.');

CREATE TABLE movie_director(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

INSERT INTO movie_director(name) VALUES
  ('Pascal Laugier'),
  ('Fede Alvarez'),
  ('Quentin Tarantino');

CREATE TABLE movie(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  id_director INT NOT NULL,
  FOREIGN KEY (id_director) REFERENCES movie_director(id)
);

INSERT INTO movie(title, id_director) VALUES
  ('Ghostland', 1),
  ('Evil Dead', 2),
  ('The Hateful Eight', 3);

CREATE TABLE media_type(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(100) NOT NULL
);

INSERT INTO media_type(type) VALUES
  ('Digital'),
  ('Physical'); 

CREATE TABLE media(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_media_type INT NOT NULL,
  id_movie INT NOT NULL,
  is_rented TINYINT(1) NOT NULL DEFAULT 0,
  FOREIGN KEY (id_media_type) REFERENCES media_type(id),
  FOREIGN KEY (id_movie) REFERENCES movie(id)
);

INSERT INTO media(id_media_type, id_movie) VALUES
  (1, 1),
  (1, 1),
  (1, 2),
  (1, 2),
  (1, 2),
  (1, 3),
  (1, 3),
  (1, 3),
  (1, 3),
  (1, 3),
  (1, 3),
  (1, 3);

CREATE TABLE rental_store_has_media(
  id_rental_store INT NOT NULL,
  id_media INT NOT NULL,
  FOREIGN KEY (id_rental_store) REFERENCES rental_store(id),
  FOREIGN KEY (id_media) REFERENCES media(id)
);

INSERT INTO rental_store_has_media(id_rental_store, id_media) VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 4),
  (1, 5),
  (1, 6),
  (1, 7),
  (1, 8),
  (1, 9),
  (1, 10),
  (1, 11),
  (1, 12);
