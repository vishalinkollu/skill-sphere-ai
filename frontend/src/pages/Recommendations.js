import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  FaArrowLeft,
} from "react-icons/fa";

import MainLayout from "../layouts/MainLayout";

import {
  getConnectionRecommendations,
  getSkillRecommendations,
  getCompanyRecommendations,
} from "../services/recommendationService";

import "./Recommendations.css";

const Recommendations = () => {
  const { id } = useParams();

  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [connections, setConnections] =
    useState([]);

  const [skills, setSkills] =
    useState([]);

  const [companies, setCompanies] =
    useState([]);

  useEffect(() => {
    fetchRecommendations();
  }, [id]);

  const fetchRecommendations =
    async () => {
      try {
        setLoading(true);

        const [
          connectionRes,
          skillRes,
          companyRes,
        ] =
          await Promise.all([
            getConnectionRecommendations(
              id
            ),
            getSkillRecommendations(
              id
            ),
            getCompanyRecommendations(
              id
            ),
          ]);

        setConnections(
          connectionRes.data.data ||
            []
        );

        setSkills(
          skillRes.data.data || []
        );

        setCompanies(
          companyRes.data.data ||
            []
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <MainLayout>
        <div className="recommendation-loading">
          <div className="loader" />
          <h2>
            Loading Recommendations...
          </h2>
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
            navigate(-1)
          }
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            background:
              "#6366f1",
            color: "white",
          }}
        >
          <FaArrowLeft />
        </button>

        <h1>
          Recommendations
        </h1>
      </div>

      <div className="recommendation-page">
        <section>
          <h2>
            People You May Know
          </h2>

          <div className="recommendation-grid">
            {connections.length >
            0 ? (
              connections.map(
                (user) => (
                  <div
                    key={user.id}
                    className="recommendation-card"
                  >
                    <div className="avatar">
                      {
                        user.name?.[0]
                      }
                    </div>

                    <h3>
                      {user.name}
                    </h3>

                    <p>
                      {user.email}
                    </p>
                  </div>
                )
              )
            ) : (
              <p>
                No recommendations
                found
              </p>
            )}
          </div>
        </section>

        <section>
          <h2>
            Recommended Skills
          </h2>

          <div className="recommendation-grid">
            {skills.length >
            0 ? (
              skills.map(
                (skill) => (
                  <div
                    key={skill.id}
                    className="recommendation-card"
                  >
                    <h3>
                      {skill.name}
                    </h3>
                  </div>
                )
              )
            ) : (
              <p>
                No skills found
              </p>
            )}
          </div>
        </section>

        <section>
          <h2>
            Companies Hiring
          </h2>

          <div className="recommendation-grid">
            {companies.length >
            0 ? (
              companies.map(
                (
                  company
                ) => (
                  <div
                    key={
                      company.id
                    }
                    className="recommendation-card"
                  >
                    <h3>
                      {
                        company.name
                      }
                    </h3>

                    <p>
                      {
                        company.industry
                      }
                    </p>
                  </div>
                )
              )
            ) : (
              <p>
                No companies
                found
              </p>
            )}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Recommendations;