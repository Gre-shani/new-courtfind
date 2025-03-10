import { Home, Calendar, Landmark, PlusCircle, BarChart, Settings, User, RefreshCw } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="d-flex flex-column p-3 bg-light vh-100 border-end">
      {/* Search Bar */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search for..."
          className="form-control"
        />
      </div>

      {/* Navigation Items */}
      <nav className="nav flex-column">
        <SidebarItem to="/dashboard" icon={Home} label="Dashboard" />
        <SidebarItem to="/arena-bookings" icon={Calendar} label="Arena Bookings" />
        <SidebarItem to="/my-arenas" icon={Landmark} label="My Arenas" />
        <SidebarItem to="/add-arena" icon={PlusCircle} label="Add Arena" />
        <SidebarItem to="/update-arenas" icon={RefreshCw} label="Update Arenas" />
        <SidebarItem to="/my-profits" icon={BarChart} label="My Profits" />
        <hr />
        <SidebarItem to="/account-settings" icon={Settings} label="Account Settings" />
        <hr />
      </nav>

      {/* Profile Section */}
      <div className="mt-auto d-flex align-items-center p-2 bg-white rounded shadow-sm">
        <User className="me-2" />
        <span className="fw-semibold">Robert Andrew</span>
      </div>
    </div>
  );
};

const SidebarItem = ({ to, icon: Icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `nav-link d-flex align-items-center gap-2 p-2 rounded ${
          isActive ? "bg-primary text-white" : "text-dark"
        }`
      }
    >
      <Icon className="me-2" />
      <span>{label}</span>
    </NavLink>
  );
};

export default Sidebar;
