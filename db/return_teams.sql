select team_id, team_name, keeper_rd, draft_order from teams
where draft_id = $1;