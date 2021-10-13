CREATE database app_book;
USE app_book;

create table phone_book
(
    id      int primary key auto_increment,
    surname varchar(255) unique not null,
    phone   varchar(255) unique not null
);
