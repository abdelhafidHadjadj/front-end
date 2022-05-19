import { Link } from "react-router-dom";
import("../Style/404.css");
export default function NotFound() {
  return (
    <>
      <div id="NotFoundBox">
        <h1>Oops!</h1>
        <span id="error404">404</span>
        <p>Page not found</p>
        <Link to="/">
          <button>Back to Home</button>
        </Link>
      </div>
    </>
  );
}
