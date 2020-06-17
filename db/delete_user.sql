delete from draft_team_link
where team_id in(select team_id from teams where user_id = $1);

delete from team_player_link
where team_id in (select team_id from teams where user_id = $1);

delete from teams
where user_id = $1;

delete from drafts
where user_id = $1;

delete from users
where user_id = $1;