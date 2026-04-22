import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";

const PlayerDetails = () => {
  const { id } = useParams();
  const API_URL_PLAYER = `https://api.balldontlie.io/v1/players/?player_ids[]=${id}`;
  const api_key = import.meta.env.VITE_API_KEY;

  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL_PLAYER}`, {
          headers: { Authorization: api_key },
        });
        if (!response.ok)
          throw new Error(`Failed to fetch ${response.status} ${response.statusText}`);
        const data = await response.json();
        setPlayer(data.data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <div className="playerdetails-header-container">
        <h1>Player Details</h1>
        <Link style={{ textDecoration: "none", color: "lightblue" }} to={"/"}>
          Back Home
        </Link>
      </div>
      <div className="player-details-container">
        {player && (
          <>
            <p className="playerdetails-labels">
              Name: {player.first_name} {player.last_name}
            </p>
            <p className="playerdetails-labels">Height: {player.height}</p>
            <p className="playerdetails-labels">Position: {player.position}</p>
            <p className="playerdetails-labels">College: {player.college}</p>
            <p className="playerdetails-labels">
              Drafted: Round {player.draft_round} Pick {player.draft_number} Year{" "}
              {player.draft_year}
            </p>
            <p className="playerdetails-labels">Team: {player.team.full_name}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PlayerDetails;
