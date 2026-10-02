import "./App.css";
import { Link, Navigate, Route, Routes } from "react-router-dom";

import AdminProductsPage from "./pages/AdminProductsPage";
import ProductsPage from "./pages/ProductsPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { isAdmin } from "./service/authService";
import ProtectedRoute from "./components/ProtectedRoute";
import PrivatePage from "./pages/PrivatePage";
import AddProductPage from "./pages/AddProductPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="app">
      <Header />
      <nav>
        <Link to="/">Hem</Link> <Link to="/products">Produkter</Link>{" "}
        <Link to="/login">Logga in</Link>
      </nav>

      <main className="main">
        <Routes>
          <Route path="/" element={<h2>Välkommen</h2>} />

          <Route path="/products" element={<ProductsPage />} />

          <Route
            path="/admin/products"
            element={
              isAdmin() ? (
                <AdminProductsPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/private"
            element={
              <ProtectedRoute>
                <PrivatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/new"
            element={
              isAdmin() ? <AddProductPage /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
