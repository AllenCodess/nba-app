import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";

const TeamPage = () => {
  const { id } = useParams();
  const API_URL = `https://api.balldontlie.io/v1/teams/${id}`;
  const api_key = import.meta.env.VITE_API_KEY;

  const [teams, setTeams] = useState("");
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

  return (
    <>
      Team Page {teams.full_name}
      <Link style={{ textDecoration: "none", color: "lightblue" }} to={"/"}>
        Back Home
      </Link>
    </>
  );
};

export default TeamPage;
