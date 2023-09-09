INSERT INTO department (department_name)
VALUES ("Plumbing"),
       ("Hardware"),
       ("Electrical"),
       ("Garden"),
       ("Woodwork");

INSERT INTO role (title, salary, department_id)
VALUES ( "Sales Associate", 23.000, 1),
       ( "Installer", 24.000, 2),
       ( "Woodworker", 25.000, 5),
       ( "Gardener", 18.000, 4),
       ( "Electrician", 35.000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Landen", "Walker", 1, NULL),
        ("Briana", "Bryant", 2, 1),
        ("Ava", "Bryant", 3, 1),
        ("Tomekia", "Walker", 4, 1),
        ("Logan", "Walker", 5, 1);