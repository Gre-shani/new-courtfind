import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./views/Login";
import Signup from "./views/Signup";
import ForgotPasswordPage from "./views/ForgotPasswordPage";
import ResetPasswordPage from "./views/ResetPasswordPage";
import AddArena from "./pages/AddArena";
import AddCourts from "./pages/AddCourts";
import Sidebar from "./components/owner/Sidebar";
import Dashboard from "./pages/Dashboard";
import ArenaBookings from "./pages/ArenaBookings";
import MyArenas from "./pages/MyArenas";
import MyProfits from "./pages/MyProfits";
import AccountSettings from "./pages/AccountSettings";

function App() {
  return (
    <Router>
      <NavigationBar />
      {/* Bootstrap Layout for Sidebar & Content */}
      <div className="d-flex vh-100">
        <Sidebar /> {/* Sidebar on the left */}
        <div className="flex-grow-1 p-4 overflow-auto"> {/* Content area */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            <Route path="/add-arena" element={<AddArena />} />
            <Route path="/add-courts" element={<AddCourts />} />
            {/* Pages that use the sidebar */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/arena-bookings" element={<ArenaBookings />} />
            <Route path="/my-arenas" element={<MyArenas />} />
            <Route path="/my-profits" element={<MyProfits />} />
            <Route path="/account-settings" element={<AccountSettings />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
