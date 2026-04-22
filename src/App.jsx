import { Routes, Route } from "react-router";
import HomePage from "./pages/home";
import TeamPage from "./pages/teampage";
import PlayerDetails from "./pages/playerdetails";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teams/:id" element={<TeamPage />} />
        <Route path="/players/:id" element={<PlayerDetails />} />
      </Routes>
    </>
  );
};

export default App;
