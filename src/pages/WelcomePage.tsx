import { getUsername } from "../service/authService";

function WelcomePage() {
  const username = getUsername();

  return (
    <div>
      <h1>Välkommen{username ? `, ${username}` : ""}!</h1>
      <p>Du är inloggad och kan nu använda webbshoppen.</p>
    </div>
  );
}

export default WelcomePage;
