import {useEffect,useState,} from "react";
import MainLayout from "../layouts/MainLayout";
import {getDashboardStats} from "../services/dashboardService";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats =
    async () => {
      try {
        const response =
          await getDashboardStats();

        setStats(
          response.data.data
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <MainLayout>
        <h2>
          Loading Dashboard...
        </h2>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="dashboard-page">
        <h1>Dashboard</h1>

        <div className="stats-grid">
          <div className="stat-card">
            <h2>
              {
                stats.totalUsers
              }
            </h2>

            <p>Total Users</p>
          </div>

          <div className="stat-card">
            <h2>
              {
                stats.totalSkills
              }
            </h2>

            <p>Total Skills</p>
          </div>

          <div className="stat-card">
            <h2>
              {
                stats.totalCompanies
              }
            </h2>

            <p>Total Companies</p>
          </div>

          <div className="stat-card">
            <h2>
              {
                stats.totalConnections
              }
            </h2>

            <p>
              Connections
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;