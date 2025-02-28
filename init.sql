DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id         INT AUTO_INCREMENT NOT NULL,
    user       VARCHAR(128) NOT NULL,
    password   VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

INSERT INTO users
  (user, password)
VALUES
  ('Admin', '$2a$10$0CHiZPhZLkxSoN4WEkvqK.RQHl6llmFjFeSd4f5anzhncnB6BqPm2'),
  ('NoAdmin', '$2a$10$A/GnYTzGxT0F4Nq46kppseBfRh07Qi7Vg6/FZRbDESoj4tVTJR.gy');