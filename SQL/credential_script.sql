DROP DATABASE IF EXISTS credentials_db;
CREATE DATABASE credentials_db;
USE credentials_db;

CREATE TABLE credentials (
	userID INT AUTO_INCREMENT,
	username VARCHAR(25) NOT NULL,
	user_password VARCHAR(50) NOT NULL,
	PRIMARY KEY (userID)
);

INSERT INTO credentials (username, user_password) VALUES ('testuser', '1234');

DROP USER IF EXISTS 'appuser'@'localhost';
CREATE USER 'appuser'@'localhost' IDENTIFIED BY 'PASSWORD';
GRANT SELECT, INSERT, UPDATE, delete ON credentials_db.* TO 'appuser'@'localhost';
