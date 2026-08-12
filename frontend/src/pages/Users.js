import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import UserCard from "../components/users/UserCard";
import SearchBar from "../components/common/SearchBar";

const Users = () => {
  const [users, setUsers] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response =
        await api.get("/users");

      setUsers(
        response.data.data
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch =
    async (value) => {
      setSearch(value);

      try {
        if (!value) {
          return fetchUsers();
        }

        const response =
          await api.get(
            `/users/search?q=${value}`
          );

        setUsers(
          response.data.data
        );
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <MainLayout>
      <h1
        style={{
          marginBottom: "24px",
        }}
      >
        Users
      </h1>

      <SearchBar
        value={search}
        onChange={(e) =>
          handleSearch(
            e.target.value
          )
        }
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(300px,1fr))",
          gap: "20px",
        }}
      >
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
          />
        ))}
      </div>
    </MainLayout>
  );
};

export default Users;