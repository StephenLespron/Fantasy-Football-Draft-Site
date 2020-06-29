insert into team_player_link
(team_id, player_id, draft_pick_index, adp, ppg, timestamp)
values
($1, $2, $3, $4, $5, current_timestamp);