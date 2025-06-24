import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ScrollToTop from "./components/ScrollToTop"
import HomePage from "./pages/HomePage"
import AuthPage from "./pages/AuthPage"
import AdminPage from "./pages/AdminPage"
import AdminLoginPage from "./pages/AdminLoginPage"
import ContactPage from "./pages/ContactPage"
import AboutPage from "./pages/AboutPage"
import "./App.css"

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
