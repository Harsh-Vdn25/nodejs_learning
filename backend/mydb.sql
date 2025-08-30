CREATE TABLE students(
    stu_id SERIAL PRIMARY KEY,
    student_name VARCHAR(55) NOT NULL,
    teacher_id INT NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id)
    ON DELETE  CASCADE
);

CREATE TABLE teachers(
    teacher_id SERIAL PRIMARY KEY,
    name VARCHAR(55) NOT NULL
);

//For taking attendance
CREATE TABLE attendance (
    student_id INT PRIMARY KEY,
    present_date DATE,
    status VARCHAR(50) 
);