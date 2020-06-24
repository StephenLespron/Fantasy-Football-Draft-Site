select team_id, team_name, keeper_rd from teams
where draft_id = $1;