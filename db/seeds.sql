INSERT INTO department (name)
VALUES ("Engineering"), 
       ("Marketing"), 
       ("Design"), 
       ("Product");

INSERT INTO role (title, salary, department_id)
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

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Brian", "Short", 1, null), 
       ("Tracey", "Monroe", 2, 1), 
       ("Wendy", "Lewst", 3, 1), 
       ("Tommy", "Bach", 4, 1), 
       ("Kara", "Tilly", 5, 1), 
       ("Carson", "Stendera", 6, 1), 
       ("Dave", "Moore", 7, 1), 
       ("Randy", "Rodriguez", 8, 1), 
       ("Ruby", "Brown", 9, 1), 
       ("Emma", "Chen", 10, 1);