import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import AdminProductsPage from "./pages/AdminProductsPage";
import ProductsPage from "./pages/ProductsPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import PrivatePage from "./pages/PrivatePage";
import AddProductPage from "./pages/AddProductPage";
import LoginPage from "./pages/LoginPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import { getMe, logout, type User } from "./service/authService";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then((currentUser) => {
        setUser(currentUser);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  async function handleLogout() {
    await logout();
    setUser(null);
  }

  return (
    <div className="app">
      <Header user={user} onLogout={handleLogout} />
      <main className="main">
        {loading ? (
          <p className="text-center p-8">Laddar...</p>
        ) : (
          <Routes>
            <Route path="/" element={<h2>Välkommen</h2>} />
            <Route path="/login" element={<LoginPage onLogin={setUser} />} />

            {/* Skyddade routes */}
            <Route element={<ProtectedRoute user={user} />}>
              <Route
                path="/products"
                element={
                  <ProductsPage user={user!} onLogout={handleLogout} />
                }
              />
              <Route path="/products/:id" element={<ProductDetailsPage />} />
            </Route>

            {/* Admin routes */}
            <Route
              path="/admin/products"
              element={
                <AdminRoute user={user}>
                  <AdminProductsPage />
                </AdminRoute>
              }
            />
            <Route
              path="/private"
              element={
                <AdminRoute user={user}>
                  <PrivatePage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products/new"
              element={
                <AdminRoute user={user}>
                  <AddProductPage />
                </AdminRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
