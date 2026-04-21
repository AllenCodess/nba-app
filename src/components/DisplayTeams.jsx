import { Link } from "react-router";

const DisplayTeams = ({ team }) => {
  return (
    <Link style={{ textDecoration: "none" }} to={`/teams/${team.id}`}>
      <div className="team">
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
    </Link>
  );
};

export default DisplayTeams;
