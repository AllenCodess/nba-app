import { useState, useEffect } from "react";
import { Link } from "react-router";

const PlayerSearch = () => {
  const API_URL = `https://api.balldontlie.io/v1/players/?first_name=anthony&last_name=davis`;
  const api_key = import.meta.env.VITE_API_KEY;

  const [searchedPlayer, setSearchedPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}`, {
          headers: { Authorization: api_key },
        });
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setSearchedPlayer(data.data);
        console.log(searchedPlayer);
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
      <div className="player-search-bar">
        <input type="text" className="search-bar" placeholder="Search Player" />{" "}
        <button className="btn">SEARCH</button>
      </div>
    </div>
  );
};

export default PlayerSearch;
