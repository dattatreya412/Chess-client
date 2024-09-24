import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import CountrySelector from '../components/Register/CountrySelector';
import { setUserInfo, updateChessboardTheme, updateIconTheme } from '../store/userSlice';

const Settings = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const userId = useSelector((state) => state.user._id);
  const [localUser, setLocalUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    country: '',
  });
  const [chessboardTheme, setChessboardTheme] = useState('default');
  const [chessboardIcon, setChessboardIcon] = useState('default');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/user/profile');
        dispatch(setUserInfo(response.data));
        setLocalUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleUpdate = async (field) => {
    try {
      await axios.put(`http://localhost:4000/api/user/update/${field}`, { [field]: localUser[field] });
      dispatch(setUserInfo({ ...user, [field]: localUser[field] }));
      alert(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully!`);
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      alert(`Failed to update ${field}. Please try again.`);
    }
  };

  const handleThemeUpdate = async () => {
    try {
      const resultAction = await dispatch(updateChessboardTheme({theme : chessboardTheme, userId})); 
      if (updateChessboardTheme.fulfilled.match(resultAction)) {
        alert('Chessboard theme updated successfully!');
      } else {
        throw new Error('Failed to update chessboard theme');
      }
    } catch (error) {
      console.error('Error updating chessboard theme:', error);
      alert('Failed to update chessboard theme. Please try again.');
    }
  };

  const handleIconUpdate = async () => {
    try {
      const resultAction = await dispatch(updateIconTheme({icon : chessboardIcon, userId}));
      if (updateIconTheme.fulfilled.match(resultAction)) {
        alert('Chessboard icon updated successfully!');
      } else {
        throw new Error('Failed to update chessboard icon');
      }
    } catch (error) {
      console.error('Error updating chessboard icon:', error);
      alert('Failed to update chessboard icon. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.clear()
    window.location.reload();
  };

  return (
    <div className="h-[80vh] bg-gray-900 text-white p-8 overflow-y-auto">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={localUser.firstName}
            onChange={handleInputChange}
            className="flex-grow px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="First Name"
          />
          <button
            onClick={() => handleUpdate('firstName')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
          >
            Update
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={localUser.lastName}
            onChange={handleInputChange}
            className="flex-grow px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Last Name"
          />
          <button
            onClick={() => handleUpdate('lastName')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
          >
            Update
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="email"
            id="email"
            name="email"
            value={localUser.email}
            onChange={handleInputChange}
            className="flex-grow px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
          />
          <button
            onClick={() => handleUpdate('email')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
          >
            Update
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <textarea
            id="bio"
            name="bio"
            value={localUser.bio}
            onChange={handleInputChange}
            className="flex-grow px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Bio"
          ></textarea>
          <button
            onClick={() => handleUpdate('bio')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
          >
            Update
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <CountrySelector
            onChange={handleInputChange}
            value={localUser.country}
          />
          <button
            onClick={() => handleUpdate('country')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
          >
            Update
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <select
            id="chessboardTheme"
            value={chessboardTheme}
            onChange={(e) => setChessboardTheme(e.target.value)}
            className="flex-grow px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="default">Default Theme</option>
            <option value="wood">Wood Theme</option>
            <option value="marble">Marble Theme</option>
            <option value="neon">Neon Theme</option>
          </select>
          <button
            onClick={handleThemeUpdate}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
          >
            Update
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <select
            id="chessboardIcon"
            value={chessboardIcon}
            onChange={(e) => setChessboardIcon(e.target.value)}
            className="flex-grow px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="default">Default Icons</option>
            <option value="minimalist">Minimalist Icons</option>
            <option value="3d">3D Icons</option>
            <option value="pixel">Pixel Icons</option>
          </select>
          <button
            onClick={handleIconUpdate}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
          >
            Update
          </button>
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;