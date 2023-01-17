-- Active: 1673886520411@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL
    );

PRAGMA table_info ('users');

SELECT * FROM users;

INSERT INTO users ( Id, email, password )
VALUES
('001', 'adalton@labenu','12345678'),
('002', 'meg@labenu','12345679'),
('002', 'meg@labenu','12345679');



CREATE TABLE
    product (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
    );

PRAGMA table_info ('product');

SELECT * FROM  product;

INSERT INTO product ( Id, name, price, category )
VALUES
('p001', 'brinco',12.90, 'acessorios'),
('p002', 'colar',20.90, 'acessorios'),
('p003', 'croped',22.90, 'roupas e calçados'),
('p004', 'short',30.90, 'roupas e calçados'),
('p005', 'calça',12.90, 'roupas e calçados');





