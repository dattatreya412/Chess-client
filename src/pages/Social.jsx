import React from 'react'

const styles = {
  socialPage: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    color: '#333',
    borderBottom: '2px solid #3498db',
    paddingBottom: '10px',
    marginBottom: '20px',
  },
  section: {
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  sectionTitle: {
    color: '#2c3e50',
    marginTop: '0',
  },
  friendsList: {
    listStyleType: 'none',
    padding: '0',
  },
  friendItem: {
    padding: '10px 0',
    borderBottom: '1px solid #eee',
  },
  activityFeed: {
    color: '#555',
  },
}

const Social = () => {
  return (
    <div style={styles.socialPage}>
      <h1 style={styles.header}>Social Hub</h1>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Friends</h2>
        <ul style={styles.friendsList}>
          <li style={styles.friendItem}>Alice Johnson (Online)</li>
          <li style={styles.friendItem}>Bob Smith (Offline)</li>
          <li style={styles.friendItem}>Charlie Brown (Away)</li>
        </ul>
      </div>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Activity Feed</h2>
        <p style={styles.activityFeed}>Recent activities from your network will appear here.</p>
      </div>
    </div>
  )
}

export default Social

