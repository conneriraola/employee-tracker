INSERT INTO departments (department_name)
VALUES ("Engineering"), 
       ("Marketing"), 
       ("Design"), 
       ("Product");

INSERT INTO roles (title, salary, department_id)
VALUES ("Eng Manager", 180000, 1),
       ("Sr. Engineer", 140000, 1),
       ("Jr. Engineer", 110000, 1),
       ("Design Manager", 120000, 3),
       ("Sr. Designer", 100000, 3),
       ("Jr. Designer", 80000, 3),
       ("Marketing Manager", 120000, 2),
       ("Marketing Coordinator", 80000, 2),
       ("Sr. Product Manager", 140000, 4),
       ("Product Manager", 100000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Brian", "Short", 1, null), 
       ("Tracey", "Monroe", 2, null), 
       ("Wendy", "Lewst", 3, null), 
       ("Tommy", "Bach", 4, null), 
       ("Kara", "Tilly", 5, null), 
       ("Carson", "Stendera", 6, null), 
       ("Dave", "Moore", 7, null), 
       ("Randy", "Rodriguez", 8, null), 
       ("Ruby", "Brown", 9, null), 
       ("Emma", "Chen", 10, null);