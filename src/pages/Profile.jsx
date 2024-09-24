import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Archive from '../components/Archive';

const Profile = () => {
  const location = useLocation();
  const defaultUser = useSelector(state => state.user);
  const user = location.state?.userData || defaultUser;
  
  return (
    <div className="profile-container p-6 bg-gray-900 text-white rounded-lg shadow-xl h-screen overflow-y-auto">
      <div className="profile-header flex items-center mb-6">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="profile-image w-32 h-32 rounded-full mr-6 border-4 border-gray-700"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
          <p className="text-lg">{user.firstName} {user.lastName}</p>
          <p className="text-lg">{user.email}</p>
          <p className="text-lg">{user.country}</p>
        </div>
      </div>
      <div className="profile-bio mb-6">
        <h2 className="text-2xl font-semibold mb-2">Bio</h2>
        <p className="text-lg">{user.bio ? user.bio : "This user has not provided a bio."}</p>
      </div>
      <div className="profile-status mb-6">
        <h2 className="text-2xl font-semibold mb-2">Status</h2>
        <div className="flex items-center mb-2">
          <span className={`w-4 h-4 rounded-full mr-2 ${user.isLive ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <p className="text-lg">Live: {user.isLive ? 'Yes' : 'No'}</p>
        </div>
        <div className="flex items-center">
          <span className={`w-4 h-4 rounded-full mr-2 ${user.isPlaying ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <p className="text-lg">Playing: {user.isPlaying ? 'Yes' : 'No'}</p>
        </div>
      </div>
      <Archive user={user} />
    </div>
  );
};

export default Profile;