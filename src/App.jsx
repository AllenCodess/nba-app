import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
const App = () => {
  const API_URL = "https://api.balldontlie.io/v1/teams";
  const api_key = import.meta.env.VITE_API_KEY;

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [conference, setConference] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}`, {
          headers: { Authorization: api_key },
        });
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setTeams(data.data);
        console.log(data);
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

  const filteredTeams = teams.slice(0, 30).filter((team) => {
    const matchesSearch = team.name.toLowerCase().includes(filter.toLowerCase());
    const matchesConference = conference === "All" || team.conference === conference;
    return matchesSearch && matchesConference;
  });

  return (
    <div className="container">
      <Header filter={filter} setConference={setConference} setFilter={setFilter} />

      <div className="teams-container">
        {filteredTeams.map((team) => (
          <div className="team" key={team.id}>
            <h3 className="team-name">{team.full_name}</h3>
            <img
              className="img-logo"
              src={
                team.abbreviation === "NOP"
                  ? "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/no.png&h=200&w=200"
                  : team.abbreviation === "UTA"
                    ? "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/utah.png&h=200&w=200"
                    : `https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/${team.abbreviation}.png&h=200&w=200`
              }
            ></img>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
