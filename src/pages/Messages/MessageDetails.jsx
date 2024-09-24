// export default MessageDetails;
import React, { useState, useEffect } from 'react';

const MessageDetails = ({ item, displayMessages }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch(`http://localhost:4000/user/getusername/${item.userId}`);
        const data = await response.json();
        if (data.success) {
          setUsername(data.username);
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, [item.userId]);

  return (
    <li 
      key={item._id} 
      onClick={() => { displayMessages(item); }} 
      className="text-white mb-2 p-4 hover:bg-gray-700 cursor-pointer rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
    >
      {username || item.userId}
    </li>
  );
};

export default MessageDetails; 