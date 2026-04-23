import { Routes, Route } from "react-router";
import HomePage from "./pages/home";
import TeamPage from "./pages/teampage";
import PlayerDetails from "./pages/playerdetails";
import PlayerSearch from "./pages/players";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teams/:id" element={<TeamPage />} />
        <Route path="/players/:id" element={<PlayerDetails />} />
        <Route path="/players" element={<PlayerSearch />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
