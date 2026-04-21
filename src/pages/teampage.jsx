import { useState, useEffect } from "react";

const TeamPage = () => {
  const API_URL = "https://api.balldontlie.io/v1/players";
  const api_key = import.meta.env.VITE_API_KEY;

  const [player, setPlayer] = useState("");
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
        setPlayer(data.data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return <>Team Page</>;
};

export default TeamPage;
