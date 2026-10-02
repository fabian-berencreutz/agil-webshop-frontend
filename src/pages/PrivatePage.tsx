import { Link } from "react-router-dom";

function PrivatePage() {
  return (
    <div>
      <h1>Adminpanel</h1>
      <p>Välkommen! Välj en åtgärd nedan:</p>
      <ul>
        <li>
          <Link to="/admin/products">Visa produkter</Link>
        </li>
        <li>
          <Link to="/admin/products/new">Lägg till produkt</Link>
        </li>
      </ul>
    </div>
  );
}

export default PrivatePage;