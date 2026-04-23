import { useState } from "react";
import { Link } from "react-router";

const PlayerSearch = () => {
  const [query, setQuery] = useState("");
  const [searchedPlayer, setSearchedPlayer] = useState([]); // why use an array right here?
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //   const API_URL = `https://api.balldontlie.io/v1/players/?search=${query}`;
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
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setSearchedPlayer(data.data);
      console.log(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="player-search-bar">
        <input
          type="text"
          className="search-bar"
          placeholder="Search Player"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button className="btn" onClick={handleSearch}>
          SEARCH
        </button>
      </div>
    </div>
  );
};

export default PlayerSearch;
