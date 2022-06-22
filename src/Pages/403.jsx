import { Link } from "react-router-dom";
import("../Style/404.css");
export default function Forbidden() {
  return (
    <>
      <div id="NotFoundBox">
        <h1>Oops!</h1>
        <span id="error404">403</span>
        <p>We are sorry</p>
        <p>Access forbidden</p>

        <Link to="/">
          <button>Back to Home</button>
        </Link>
      </div>
    </>
  );
}
