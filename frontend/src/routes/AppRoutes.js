import {
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import UserDetails from "../pages/UserDetails";
import Recommendations from "../pages/Recommendations";
import GraphExplorer from "../pages/GraphExplorer";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Dashboard />}
      />

      <Route
        path="/users"
        element={<Users />}
      />

      <Route
        path="/users/:id"
        element={<UserDetails />}
      />

      <Route
        path="/recommendations/:id"
        element={<Recommendations />}
      />

      <Route
        path="/graph"
        element={<GraphExplorer />}
      />
    </Routes>
  );
};

export default AppRoutes;