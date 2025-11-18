import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./stores/authStore";
import Navigation from "./components/common/Navigation";
import Footer from "./components/common/Footer";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AdminLogin from "./components/admin/AdminLogin";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import CategoryManagement from "./components/admin/CategoryManagement";
import CategoryForm from "./components/admin/CategoryForm";
import ProductManagement from "./components/admin/ProductManagement";
import ProductForm from "./components/admin/ProductForm";
import ContactManagement from "./components/admin/ContactManagement";
import axios from "axios";

// Set up axios defaults
axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://localhost:3001";

function App() {
  const { verifyAuth } = useAuthStore();

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  const handleWhatsAppSignup = async (name: string, phone: string) => {
    try {
      await axios.post("/api/contact/whatsapp-group", {
        name,
        phone,
        message: "Joined via website footer"
      });
    } catch (error) {
      console.error("Error signing up for WhatsApp:", error);
      throw error;
    }
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          {/* Public Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Main Website Routes */}
          <Route path="/*" element={
            <div className="flex flex-col min-h-screen">
              <Navigation />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                </Routes>
              </main>
              <Footer onWhatsAppSignup={handleWhatsAppSignup} />
            </div>
          } />

          {/* Admin Routes */}
          <Route path="/admin/*" element={
            <ProtectedRoute>
              <AdminLayout>
                <Routes>
                  <Route path="/dashboard" element={<AdminDashboard />} />
                  <Route path="/categories" element={<CategoryManagement />} />
                  <Route path="/categories/add" element={<CategoryForm />} />
                  <Route path="/categories/edit/:id" element={<CategoryForm />} />
                  <Route path="/products" element={<ProductManagement />} />
                  <Route path="/products/add" element={<ProductForm />} />
                  <Route path="/products/edit/:id" element={<ProductForm />} />
                  <Route path="/contacts" element={<ContactManagement />} />
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
