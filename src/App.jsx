import { useState, useEffect } from "react";
const App = () => {
  const API_URL = "https://api.balldontlie.io/v1/teams";
  const api_key = import.meta.env.VITE_API_KEY;

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}`, {
          headers: { Authorization: api_key },
        });
        if (!response.ok) throw new Error("Failed to fetch data");
        const teams = await response.json();
        setTeams(teams.data);
        console.log(teams);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>NBA STATS APP</h1>
      <div className="teams-container">
        {teams.slice(0, 30).map((team) => (
          <div key={team.id}>{team.name}</div>
        ))}
      </div>
    </div>
  );
};

export default App;
