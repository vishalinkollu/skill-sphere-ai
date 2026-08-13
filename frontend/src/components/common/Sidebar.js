import {
  FaHome,
  FaUsers,
  FaProjectDiagram,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive
            ? "sidebar-link active"
            : "sidebar-link"
        }
      >
        <FaHome />
        <span>Dashboard</span>
      </NavLink>

      <NavLink
        to="/users"
        className={({ isActive }) =>
          isActive
            ? "sidebar-link active"
            : "sidebar-link"
        }
      >
        <FaUsers />
        <span>Users</span>
      </NavLink>

      <NavLink
        to="/graph"
        className={({ isActive }) =>
          isActive
            ? "sidebar-link active"
            : "sidebar-link"
        }
      >
        <FaProjectDiagram />
        <span>Graph</span>
      </NavLink>
    </aside>
  );
};

export default Sidebar;