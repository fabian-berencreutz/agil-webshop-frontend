import { Link, Route, Routes } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <nav>
        <Link to="/products">Produkter</Link>
      </nav>
      <main className="main">
        <Routes>
          <Route path="/" element={<h2>Välkommen</h2>} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
