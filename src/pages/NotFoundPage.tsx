import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div>
      <h1>404</h1>
      <h2>Sidan hittades inte</h2>
      <p>Sidan du försöker besöka finns inte.</p>

      <Link to="/">Till startsidan</Link>
    </div>
  );
}

export default NotFoundPage;
