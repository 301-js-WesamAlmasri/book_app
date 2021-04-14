DROP TABLE IF EXISTS books;
CREATE TABLE books (
id SERIAL PRIMARY KEY,
auther VARCHAR(200),
title VARCHAR(200),
isbn VARCHAR(200),
book_shelf VARCHAR(200),
image_url VARCHAR(200),
description TEXT
);

INSERT INTO books
(auther, title, isbn, book_shelf, image_url, description)
VALUES ('Wesam Al-Masri', 'The seven answers', 'isbn_LA 54548481561', 'Fantasy', 'https://books.google.com/books/content?id=Bx-f7rGN-IkC&printsec=frontcover&img=1&zoom=1&source=gbs_api', 'The top one book in its field');

INSERT INTO books
(auther, title, isbn, book_shelf, image_url, description)
VALUES ('Nadeem Al-Masri', 'The seven quastions', 'isbn_LA 54548481561', 'Fantasy', 'https://books.google.com/books/content?id=Bx-f7rGN-IkC&printsec=frontcover&img=1&zoom=1&source=gbs_api', 'The top one book in its field');