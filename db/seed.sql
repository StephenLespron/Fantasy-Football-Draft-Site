drop table if exists team_player_link;
drop table if exists players;
drop table if exists teams;
drop table if exists drafts;
drop table if exists users;

create table users (
user_id serial primary key,
username varchar(30),
hash_pass text,
email varchar(100)
);

create table drafts (
draft_id serial primary key,
user_id integer references users(user_id),
date date not null default current_date
);

create table teams (
team_id serial primary key,
draft_id integer references drafts(draft_id),
team_name varchar(50),
keeper_rd int,
draft_order int
);

create table players (
player_id integer primary key,
first_name varchar(50),
last_name varchar(50),
team varchar(30),
position varchar(20)
);

create table team_player_link (
tp_link_id serial primary key,
team_id integer references teams(team_id),
player_id integer references players(player_id),
draft_pick_index integer
);

