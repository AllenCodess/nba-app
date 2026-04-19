import { useState, useEffect } from "react";
const App = () => {
  const API_URL = "https://api.balldontlie.io/v1/teams";
  const api_key = import.meta.env.VITE_API_KEY;

  const [data, setData] = useState([]);
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
        setData(data);
        console.log(data);
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
    </div>
  );
};

export default App;
