import { Link } from "react-router-dom";


const ErrorPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}>
        <h1>404</h1>
        <p>Page not found</p>
        <Link to="/" className="btn btn-danger">Go to Home</Link>
    </div>
  );
};

export default ErrorPage;
