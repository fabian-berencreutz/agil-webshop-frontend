import "./App.css";
import { Link, Route, Routes, useLocation } from "react-router-dom";

import AdminProductsPage from "./pages/AdminProductsPage";
import ProductsPage from "./pages/ProductsPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

import AdminRoute from "./components/AdminRoute";
import PrivatePage from "./pages/PrivatePage";
import AddProductPage from "./pages/AddProductPage";
import LoginPage from "./pages/LoginPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

import { isAdmin, isAuthenticated } from "./service/authService";

function App() {
  useLocation();

  return (
    <div className="app">
      <Header />

      <nav>
        <Link to="/">Hem</Link> <Link to="/products">Produkter</Link>{" "}
        {isAdmin() && (
          <>
            <Link to="/private">Adminpanel</Link>{" "}
          </>
        )}
        {!isAuthenticated() && <Link to="/login">Logga in</Link>}
      </nav>

      <main className="main">
        <Routes>
          <Route path="/" element={<h2>Välkommen</h2>} />

          <Route path="/products" element={<ProductsPage />} />

          <Route path="/products/:id" element={<ProductDetailsPage />} />

          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <AdminProductsPage />
              </AdminRoute>
            }
          />

          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/private"
            element={
              <AdminRoute>
                <PrivatePage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/products/new"
            element={
              <AdminRoute>
                <AddProductPage />
              </AdminRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
