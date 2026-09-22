import { Link, Route, Routes } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
    <div>
      <nav>
        <Link to="/products">Produkter</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h1>Agil Webbshop</h1>} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </div>
  );
}

export default App;
