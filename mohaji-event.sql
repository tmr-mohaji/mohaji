CREATE DATABASE mohaji;
use mohaji;

drop table event;
drop table user;

CREATE TABLE event (
	id int not null primary key auto_increment,
    title varchar(255) not null,
    url mediumtext,
    detail mediumtext,
    type varchar(255) not null,
    place varchar(255) not null,
    address mediumtext not null,
    start_date date not null,
    end_date date not null,
    time varchar(255) not null default "홈페이지 참고",
    people varchar(255) not null default "누구나",
    filename varchar(255) not null,
    price varchar(255) not null default "무료"
);

CREATE TABLE user (
	id varchar(255) not null primary key,
    password varchar(255),
    nickname varchar(255),
    email varchar(255)
);

select * from event;