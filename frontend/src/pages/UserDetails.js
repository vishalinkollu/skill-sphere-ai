import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import ProfileCard from "../components/users/ProfileCard";
import InfoSection from "../components/users/InfoSection";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/users/${id}`
        );

        if (isMounted) {
          setData(response.data.data);
        }
      } catch (err) {
        console.error(err);

        if (isMounted) {
          setError(
            "Failed to load user profile."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadUser();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="page-loader">
          <div className="loader"></div>
          <h2>Loading User...</h2>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="error-state">
          <h2>Unable to load profile</h2>
          <p>{error}</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <button
          onClick={() =>
            navigate("/users")
          }
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            background: "#6366f1",
            color: "#fff",
          }}
        >
          <FaArrowLeft />
        </button>

        <h1>User Profile</h1>
      </div>

      <ProfileCard user={data.user} />

      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() =>
            navigate(
              `/recommendations/${id}`
            )
          }
          style={{
            background: "#6366f1",
            color: "#fff",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          View Recommendations
        </button>
      </div>

      <InfoSection
        title="Skills"
        items={data.skills}
        field="name"
      />

      <InfoSection
        title="Companies"
        items={data.companies}
        field="name"
      />

      <InfoSection
        title="Connections"
        items={data.connections}
        field="name"
      />
    </MainLayout>
  );
};

export default UserDetails;