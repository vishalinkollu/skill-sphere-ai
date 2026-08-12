import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import ProfileCard from "../components/users/ProfileCard";
import InfoSection from "../components/users/InfoSection";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const UserDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
    }, [id]);

    const fetchUser =
        async () => {
            try {
                const response =
                    await api.get(
                        `/users/${id}`
                    );

                setData(
                    response.data.data
                );
            } catch (error) {
                console.error(error);
            }
        };

    if (!data) {
        return (
            <MainLayout>
                <h2>Loading...</h2>
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
                    onClick={() => navigate("/users")}
                    style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        border: "none",
                        cursor: "pointer",
                        background: "#6366f1",
                        color: "white",
                    }}
                >
                    <FaArrowLeft />
                </button>

                <h1>User Profile</h1>
            </div>
            <ProfileCard
                user={data.user}
            />
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
                        padding:
                            "12px 20px",
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