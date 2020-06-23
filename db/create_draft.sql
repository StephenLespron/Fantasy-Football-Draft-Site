insert into drafts
(user_id)
values
($1);

select draft_id, date from drafts
where draft_id = (
    select max(draft_id) from drafts
    where user_id = $1
);