import React, { useState } from 'react';
import axios from 'axios';

const HighlightForm = () => {
  const [highlightImg, setHighlightImg] = useState(null);
  const [highlightTitle, setHighlightTitle] = useState('');

  const handleFileChange = (e) => {
    setHighlightImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('highlightImg', highlightImg); // Image for highlights
    formData.append('highlightTitle', highlightTitle); // Title for highlights

    try {
      const response = await axios.post('http://localhost:4000/news/api/highlights', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error uploading data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Upload Highlight Image and Title</h3>
      
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        required
      />
      
      <input
        type="text"
        placeholder="Title"
        value={highlightTitle}
        onChange={(e) => setHighlightTitle(e.target.value)}
        required
      />
      
      <button type="submit">Submit</button>
    </form>
  );
};

export default HighlightForm;
