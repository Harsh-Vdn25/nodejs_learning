CREATE TABLE todolist(
user_id INT NOT NULL,
todo_id SERIAL PRIMARY KEY,
description VARCHAR(100) NOT NULL,
FOREIGN KEY (user_id) REFERENCES userinfo(user_id)
ON DELETE  CASCADE
);