import React from 'react';

const Header = () => {
  return (
    <header style={{
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderBottom: '1px solid #e0e0e0'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#333',
        margin: '0'
      }}>
        Learn
      </h1>
      <p style={{
        fontSize: '1.1rem',
        color: '#666',
        marginTop: '10px'
      }}>
        Explore our lessons and enhance your skills
      </p>
    </header>
  );
};

export default Header;