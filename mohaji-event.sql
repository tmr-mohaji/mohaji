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

CREATE TABLE event_like (
    id int not null primary key auto_increment,
	user_id varchar(255) not null,
    FOREIGN KEY ( user_id ) REFERENCES user(id) ON DELETE CASCADE,
	event_id int not null,
    FOREIGN KEY ( event_id ) REFERENCES event(id) ON DELETE CASCADE
);

CREATE TABLE review (
	id int not null primary key auto_increment,
    user_id varchar(255) not null,
    FOREIGN KEY ( user_id ) REFERENCES user(id) ON DELETE CASCADE,
    event_id int not null,
    FOREIGN KEY ( event_id ) REFERENCES event(id) ON DELETE CASCADE,
    score decimal(3,2) not null,
    content mediumtext,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP
);

CREATE TABLE review_img (
	id int not null primary key auto_increment,
    review_id int not null,
    FOREIGN KEY (review_id) REFERENCES review(id) on DELETE CASCADE,
    filename varchar(255) not null
);

CREATE TABLE schedule (
	id int not null primary key auto_increment,
    user_id varchar(255) not null,
    FOREIGN KEY ( user_id ) REFERENCES user(id) ON DELETE CASCADE,
    event_id int not null,
    FOREIGN KEY ( event_id ) REFERENCES event(id) ON DELETE CASCADE,
    date date not null
);

select * from event;