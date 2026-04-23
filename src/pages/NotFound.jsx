import { Link } from "react-router";

const NotFound = () => {
  return (
    <>
      <div className="container">
        <Link style={{ textDecoration: "none", color: "lightblue" }} to={"/"}>
          Back Home
        </Link>
        <h1 className="notfound">Page Not Found</h1>
      </div>
    </>
  );
};

export default NotFound;
