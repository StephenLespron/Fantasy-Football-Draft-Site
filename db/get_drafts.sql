select * from drafts
where user_id = $1
order by draft_id desc