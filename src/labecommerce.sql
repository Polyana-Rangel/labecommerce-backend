-- Active: 1673886520411@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL
    );

PRAGMA table_info ('users');

INSERT INTO
    users (Id, email, password)
VALUES (
        '001',
        'adalton@labenu',
        '12345678'
    ), (
        '002',
        'meg@labenu',
        '12345679'
    ), (
        '003',
        'alessandra@labenu',
        '12345677'
    );

INSERT INTO
    users (Id, email, password)
VALUES (
        '004',
        'fabio@labenu.com',
        '3456789'
    );

----------------------------------------------------------------------------------------

CREATE TABLE
    product (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
    );

PRAGMA table_info ('product');

INSERT INTO
    product (Id, name, price, category)
VALUES (
        'p001',
        'brinco',
        12.90,
        'acessorios'
    ), (
        'p002',
        'colar',
        20.90,
        'acessorios'
    ), (
        'p003',
        'croped',
        22.90,
        'roupas e calçados'
    ), (
        'p004',
        'short',
        30.90,
        'roupas e calçados'
    ), (
        'p005',
        'calça',
        12.90,
        'roupas e calçados'
    );

INSERT INTO
    product (Id, name, price, category)
VALUES (
        'p006',
        'monitor',
        112.90,
        'eletronicos'
    );

INSERT INTO
    product (Id, name, price, category)
VALUES (
        'p007',
        'mouse',
        300.00,
        'eletronicos'
    ), (
        'p008',
        'tv',
        500.00,
        'eletronicos'
    ), (
        'p009',
        'teclado gamer',
        700.00,
        'eletronicos'
    );

INSERT INTO
    product (Id, name, price, category)
VALUES (
        'p011',
        'jbl-plus',
        1000.00,
        'eletronicos'
    );

SELECT * FROM users;

SELECT * FROM product;

SELECT (name) FROM product;

SELECT * FROM product WHERE name = 'monitor';

SELECT * from users ORDER BY email ASC;

SELECT * from product WHERE id='p011';

DELETE FROM users WHERE id= '004';


DELETE FROM product WHERE id= 'p004';

SELECT * from product ORDER BY price ASC LIMIT 20 OFFSET 0;

SELECT *
from product
WHERE
    price >= 300.00
    and price <= 1000.00
ORDER BY price ASC;

ALTER TABLE userById
RENAME TO users ;

UPDATE users SET email = 'maria@labenu' WHERE id = '003';

UPDATE product SET name = 'chinelo' WHERE id = 'p003';