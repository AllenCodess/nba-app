const Header = ({ filter, setFilter, setConference }) => {
  return (
    <>
      <h1>NBA STATS APP</h1>
      <div className="filter">
        <input
          className="search-bar"
          type="text"
          value={filter}
          placeholder="Search Team Name"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
        <button className="btn" onClick={() => setConference("All")}>
          All
        </button>
        <button className="btn" onClick={() => setConference("East")}>
          East
        </button>
        <button className="btn" onClick={() => setConference("West")}>
          West
        </button>
      </div>
    </>
  );
};

export default Header;
