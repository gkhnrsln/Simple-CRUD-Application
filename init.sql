DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id         CHAR(36) NOT NULL DEFAULT (UUID()),
    username   VARCHAR(128) NOT NULL,
    password   VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO users
  (id, username, password)
VALUES
  (UUID(), 'Admin', '$2a$10$0CHiZPhZLkxSoN4WEkvqK.RQHl6llmFjFeSd4f5anzhncnB6BqPm2'),
  (UUID(), 'NoAdmin', '$2a$10$A/GnYTzGxT0F4Nq46kppseBfRh07Qi7Vg6/FZRbDESoj4tVTJR.gy');


DROP TABLE IF EXISTS persons;
CREATE TABLE persons (
    id         CHAR(36) NOT NULL DEFAULT (UUID()),
    firstname  VARCHAR(128) NOT NULL,
    lastname   VARCHAR(128) NOT NULL,
    birthday   DATE NOT NULL,
    mail       VARCHAR(255),
    phone      VARCHAR(20),
    profession VARCHAR(128),
    PRIMARY KEY (id)
);

INSERT INTO persons (id, firstname, lastname, birthday, mail, phone, profession)
VALUES
    (UUID(), 'Joy', 'Dare', '1987-12-21', 'joy.dare@example.com', '0123456679-1', 'CEO'),
    (UUID(), 'Vida', 'King', '2007-06-16', 'vida.king@example.com', '0123456679-2', NULL),
    (UUID(), 'Kristy', 'Prohaska', '1977-01-28', 'kristy.prohaska@example.com', '0123456679-3', NULL),
    (UUID(), 'Curtis', 'Runolfsson', '2018-04-06', 'curtis.runolfsson@example.com', '0123456679-4', NULL),
    (UUID(), 'Caitlyn', 'Glover', '1986-05-11', 'caitlyn.glover@example.com', '0123456679-5', NULL),
    (UUID(), 'Tatyana', 'Gottlieb', '2017-12-17', 'tatyana.gottlieb@example.com', '0123456679-6', NULL),
    (UUID(), 'Hardy', 'Lang', '1987-08-13', 'hardy.lang@example.com', '0123456679-7', NULL),
    (UUID(), 'Geovanny', 'Bednar', '2014-09-17', 'geovanny.bednar@example.com', '0123456679-8', NULL),
    (UUID(), 'Jackeline', 'Ullrich', '2009-05-09', 'jackeline.ullrich@example.com', '0123456679-9', NULL),
    (UUID(), 'Fern', 'Mertz', '1969-07-18', 'fern.mertz@example.com', '0123456679-10', NULL),
    (UUID(), 'Ayden', 'Raynor', '1978-07-08', 'ayden.raynor@example.com', '0123456679-11', NULL),
    (UUID(), 'Robb', 'Bahringer', '1977-08-15', 'robb.bahringer@example.com', '0123456679-12', NULL),
    (UUID(), 'Lesley', 'Dietrich', '1988-04-22', 'lesley.dietrich@example.com', '0123456679-13', NULL),
    (UUID(), 'Joey', 'Zieme', '1995-12-05', 'joey.zieme@example.com', '0123456679-14', NULL),
    (UUID(), 'Brandi', 'Stark', '2008-10-15', 'brandi.stark@example.com', '0123456679-15', NULL),
    (UUID(), 'Tyson', 'Hartmann', '1972-04-19', 'tyson.hartmann@example.com', '0123456679-16', NULL),
    (UUID(), 'Rocio', 'Jacobson', '2018-03-18', 'rocio.jacobson@example.com', '0123456679-17', NULL),
    (UUID(), 'Donna', 'Mann', '1996-09-15', 'donna.mann@example.com', '0123456679-18', NULL),
    (UUID(), 'Gus', 'Breitenberg', '2001-03-06', 'gus.breitenberg@example.com', '0123456679-19', NULL),
    (UUID(), 'Esta', 'Herzog', '1977-11-16', 'esta.herzog@example.com', '0123456679-20', NULL),
    (UUID(), 'Camren', 'Emard', '2010-01-25', NULL, NULL, NULL),
    (UUID(), 'Mac', 'Williamson', '2002-04-05', NULL, NULL, NULL),
    (UUID(), 'Joy', 'Boyer', '1967-11-17', NULL, NULL, NULL),
    (UUID(), 'Lolita', 'Spinka', '1993-02-17', NULL, NULL, NULL),
    (UUID(), 'Weldon', 'Konopelski', '1990-03-08', NULL, NULL, NULL),
    (UUID(), 'Fausto', 'Roberts', '1974-11-26', NULL, NULL, NULL),
    (UUID(), 'Mina', 'Adams', '1974-01-04', NULL, NULL, NULL),
    (UUID(), 'Mayra', 'Hansen', '1979-08-23', NULL, NULL, NULL),
    (UUID(), 'Nicola', 'Berge', '2013-05-19', NULL, NULL, NULL),
    (UUID(), 'Iva', 'Batz', '2008-11-15', NULL, NULL, NULL);