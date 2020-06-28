select p.player_id, p.first_name, p.last_name, p.team, p.position, tp.draft_pick_index, tp.adp, tp.ppg, t.team_name from players p
join team_player_link tp on tp.player_id = p.player_id
join teams t on t.team_id = tp.team_id
where tp.team_id in ( 
    select tp.team_id from team_player_link tp
    where t.draft_id = $1 )

order by tp.draft_pick_index asc;
