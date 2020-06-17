insert into users
(username, hash_pass, email)
values
($1, $2, $3);

select user_id, username, email from users
where username = $1;