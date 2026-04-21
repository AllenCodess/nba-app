import { Routes, Route } from "react-router";
import HomePage from "./pages/home";
import TeamPage from "./pages/teampage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teams/:id" element={<TeamPage />} />
      </Routes>
    </>
  );
};

export default App;
