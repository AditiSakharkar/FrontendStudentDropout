import React from 'react';

function UserProfile({ user }) {
  return (
    <div className="user-profile">
      <div className="profile-picture">
        <img src="path/to/default-profile.png" alt="Profile" />
      </div>
      <h4>{user.name}</h4>
      <button>Edit Profile</button>
    </div>
  );
}

export default UserProfile;