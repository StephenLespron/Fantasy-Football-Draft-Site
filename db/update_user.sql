update users
set
 username = $2,
    email = $3,
hash_pass = $4
where 
  user_id = $1;

  select * from users
  where user_id = $1