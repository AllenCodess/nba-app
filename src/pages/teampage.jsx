import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";

const TeamPage = () => {
  const { id } = useParams();
  const API_URL = `https://api.balldontlie.io/v1/teams/${id}`;
  const api_key = import.meta.env.VITE_API_KEY;

  const [teams, setTeams] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}`, {
          headers: { Authorization: api_key },
        });
        if (!response.ok)
          throw new Error(`Failed to fetch ${response.status} ${response.statusText}`);
        const data = await response.json();
        setTeams(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const API_URL_PLAYERS = `https://api.balldontlie.io/v1/players/?team_ids[]=${id}&per_page=5`;
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchDataPlayer = async () => {
      try {
        const response = await fetch(`${API_URL_PLAYERS}`, {
          headers: { Authorization: api_key },
        });
        if (!response.ok)
          throw new Error(`Failed to fetch ${response.status} ${response.statusText}`);
        const data = await response.json();
        setPlayers(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDataPlayer();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <div className="teampage-heading">
        <h1 className="teampage-header">{teams.full_name} Team Page</h1>
        <Link style={{ textDecoration: "none", color: "lightblue" }} to={"/"}>
          Back Home
        </Link>
      </div>
      <div className="teampage-container">
        <div className="team-img-container">
          <img
            className="teampage-img"
            src={
              `${teams.abbreviation}` === "NOP"
                ? "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/no.png&h=200&w=200"
                : `${teams.abbreviation}` === "UTA"
                  ? "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/utah.png&h=200&w=200"
                  : `https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/${teams.abbreviation}.png&h=200&w=200`
            }
            alt={`${teams.full_name}`}
          ></img>
        </div>
        <div className="team-information">
          <p className="team-information-text">Abbreviation: {teams.abbreviation}</p>
          <p className="team-information-text">City: {teams.city}</p>
          <p className="team-information-text">Conference: {teams.conference}</p>
          <p className="team-information-text">Division: {teams.division}</p>
          <p className="team-information-text">Full Name: {teams.full_name}</p>
        </div>
      </div>
      <h2 className="playerName-heading">Players</h2>
      <div className="players-container">
        {players.map((player) => (
          <div key={player.id}>
            <Link
              className="playerNamesInsideTeamPage"
              to={`/players/${player.id}`}
              style={{ textDecoration: "none" }}
            >
              <p>
                {player.first_name} {player.last_name}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
