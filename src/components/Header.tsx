import { Link } from "react-router-dom";
import type { User } from "../service/authService";

type HeaderProps = {
  user: User | null;
  onLogout: () => void;
};

function Header({ user, onLogout }: HeaderProps) {
  const isAdmin = user?.roles.some(
    (role) => role === "ADMIN" || role === "ROLE_ADMIN",
  );

  return (
    <header className="text-center bg-slate-800 text-white p-4">
      <h1 className="text-5xl">Webshop</h1>

      {user && (
        <div>
          <p>Inloggad som: {user.subject}</p>
          <p>Roll: {user.roles.join(", ")}</p>
        </div>
      )}

      <nav>
        <Link to="/">Hem</Link> <Link to="/products">Produkter</Link>{" "}
        {isAdmin && (
          <>
            <Link to="/private">Adminpanel</Link>{" "}
          </>
        )}
        {user ? (
          <button type="button" onClick={onLogout}>
            Logga ut
          </button>
        ) : (
          <Link to="/login">Logga in</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
