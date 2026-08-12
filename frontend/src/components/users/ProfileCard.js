import "./ProfileCard.css";

const ProfileCard = ({ user }) => {
  return (
    <div className="profile-card">
      <div className="profile-avatar">
        {user.name?.charAt(0)}
      </div>

      <div>
        <h2>{user.name}</h2>

        <p>{user.email}</p>

        <p>{user.location}</p>

        <p>
          Experience: {user.experience} years
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;