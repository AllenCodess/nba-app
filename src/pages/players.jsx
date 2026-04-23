import { useState } from "react";
import { Link } from "react-router";

const PlayerSearch = () => {
  const [query, setQuery] = useState("");
  const [searchedPlayer, setSearchedPlayer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api_key = import.meta.env.VITE_API_KEY;

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    const parts = query.trim().split(" ");
    console.log(query);
    const firstName = parts[0];
    const lastName = parts[1];

    const API_URL = `https://api.balldontlie.io/v1/players/?first_name=${firstName}&last_name=${lastName}`;

    try {
      const response = await fetch(`${API_URL}`, {
        headers: { Authorization: api_key },
      });
      if (!response.ok)
        throw new Error(
          `Request failed (${response.status}: ${response.statusText}). If you're seeing a 429, the free tier rate limit has been hit — please wait 30 seconds and try again.`,
        );
      const data = await response.json();
      setSearchedPlayer(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="playerdetails-header-container">
        <h1>Player Search</h1>
        <Link style={{ textDecoration: "none", color: "lightblue" }} to={"/"}>
          Back Home
        </Link>
      </div>
      <div className="player-search-bar">
        <input
          type="text"
          className="search-bar"
          placeholder="Search Player Full Name"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button className="btn" onClick={handleSearch}>
          SEARCH
        </button>
        {searchedPlayer.length > 0 && (
          <div className="player-search-container">
            {searchedPlayer.map((player) => (
              <div key={player.id}>
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerSearch;
