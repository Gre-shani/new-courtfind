import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import MainLayout from "./components/MainLayout";

// Common Views
import Login from "./views/Login";
import Signup from "./views/Signup";
import ForgotPasswordPage from "./views/ForgotPasswordPage";
import ResetPasswordPage from "./views/ResetPasswordPage";
import ContactUs from "./views/ContactUs";
import Chatbot from "./components/Chatbot";
<<<<<<< HEAD
import FloatingChatbot from "./components/FloatingChatbot";
import AddArena from "./views/AddArena";
import AddCourts from "./views/AddCourts";
import Dashboard from "./views/Dashboard";
import Sidebar from "./components/owner/Sidebar";
=======
import ExploreNow from "./views/ExploreNow";
>>>>>>> origin/master

// Player Views
import PlayerDashboard from "./views/PlayerDashboard";
import PlayerProfile from "./views/PlayerProfile";

// Owner Views
import OwnerDashboard from "./views/OwnerDashboard";
import ChangePassword from "./views/changePassword";
import OwnerProfile from "./components/OwnerProfile";

// Admin Views
import AdminDashboard from "./views/AdminDashboard";
import AdminBugs from "./views/AdminBugs";
import AdminOwners from "./views/AdminOwners";
import AdminPlayers from "./views/AdminPlayers";
import AdminPricing from "./views/AdminPricing";
import AdminProfit from "./views/AdminProfit";
import AdminReviews from "./views/AdminReviews";
import AdminProfile from "./views/AdminProfile";

// Helper component for wrapping routes with layout
const withLayout = (Component) => (
  <MainLayout>
    <Component />
  </MainLayout>
);

// Route configs
const commonRoutes = [
  { path: "/", element: Login },
  { path: "/login", element: Login },
  { path: "/signup", element: Signup },
  { path: "/dashboard", element: Dashboard },
  { path: "/forgot-password", element: ForgotPasswordPage },
  { path: "/reset-password/:token", element: ResetPasswordPage },
  { path: "/contact", element: ContactUs },
  { path: "/chatbot", element: Chatbot },
  { path: "/explore-now", element: ExploreNow }
];

const playerRoutes = [
  { path: "/player-dashboard", element: PlayerDashboard },
  { path: "/player-profile", element: PlayerProfile }
];

const ownerRoutes = [
  { path: "/owner-dashboard", element: OwnerDashboard },
  { path: "/change-password", element: ChangePassword },
  { path: "/owner-profile", element: OwnerProfile }
];

const adminRoutes = [
  { path: "/admin-dashboard", element: AdminDashboard },
  { path: "/admin-owners", element: AdminOwners },
  { path: "/admin-players", element: AdminPlayers },
  { path: "/admin-profit", element: AdminProfit },
  { path: "/admin-pricing", element: AdminPricing },
  { path: "/admin-bugs", element: AdminBugs },
  { path: "/admin-reviews", element: AdminReviews },
  { path: "/admin-profile", element: AdminProfile }
];

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Common Routes */}
          {commonRoutes.map(({ path, element: Component }) => (
            <Route key={path} path={path} element={withLayout(Component)} />
          ))}

<<<<<<< HEAD
                <Route element={<PrivateRoute allowedRoles={["Owner"]} />}>
                    <Route path="/owner-dashboard" element={<OwnerDashboard />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                    {/* Add Arena and courts routes */}
                    <Route 
                    path="/add-arena" 
                    element={
                        <div className="d-flex">
                            <Sidebar /> {/* Sidebar on the left */}
                            <div className="flex-grow-1 p-4">
                                <AddArena /> {/* Content on the right */}
                            </div>
                        </div>
                    } 
                />

                <Route 
                    path="/add-courts" 
                    element={
                        <div className="d-flex">
                            <Sidebar /> {/* Sidebar on the left */}
                            <div className="flex-grow-1 p-4">
                                <AddCourts /> {/* Content on the right */}
                            </div>
                        </div>
                    } 
                />
                    
                </Route>
                {/* End of Role-based protected routes */}
                <Route path="/chatbot" element={<Chatbot />} />

                
            </Routes>
            <FloatingChatbot />
            </div>
            <Footer />
        </Router>
        </AuthProvider>
    );
=======
          {/* Player Routes */}
          <Route element={<PrivateRoute allowedRoles={["Player"]} />}>
            {playerRoutes.map(({ path, element: Component }) => (
              <Route key={path} path={path} element={withLayout(Component)} />
            ))}
          </Route>

          {/* Owner Routes */}
          <Route element={<PrivateRoute allowedRoles={["Owner"]} />}>
            {ownerRoutes.map(({ path, element: Component }) => (
              <Route key={path} path={path} element={withLayout(Component)} />
            ))}
          </Route>

          {/* Admin Routes - No layout */}
          <Route element={<PrivateRoute allowedRoles={["Admin"]} />}>
            {adminRoutes.map(({ path, element: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
>>>>>>> origin/master
}

export default App;
