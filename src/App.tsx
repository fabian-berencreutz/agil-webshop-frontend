import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <h2>Välkommen</h2>
        <p>Här kommer webbshoppen.</p>
      </main>
      <Footer />
    </div>
  );
}

export default App;
