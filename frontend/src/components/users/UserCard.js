import { Link } from "react-router-dom";
import "./UserCard.css";

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <div className="user-avatar">
        {user.name?.charAt(0)}
      </div>

      <h3>{user.name}</h3>

      <p>{user.email}</p>

      <p>{user.location}</p>

      <p>
        Experience: {user.experience} years
      </p>

      <Link
        to={`/users/${user.id}`}
        className="view-btn"
      >
        View Profile
      </Link>
    </div>
  );
};

export default UserCard;