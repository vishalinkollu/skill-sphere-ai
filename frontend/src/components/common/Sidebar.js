import {
  FaHome,
  FaUsers,
  FaProjectDiagram,
  FaLightbulb,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <Link to="/">
        <FaHome />
        Dashboard
      </Link>

      <Link to="/users">
        <FaUsers />
        Users
      </Link>


      <Link to="/graph">
        <FaProjectDiagram />
        Graph
      </Link>
    </aside>
  );
};

export default Sidebar;