import React, { useState } from 'react';
import axios from 'axios';

const UploadForms = () => {
  const [highlightImg, setHighlightImg] = useState(null);
  const [highlightTitle, setHighlightTitle] = useState('');

  const [newsImg, setNewsImg] = useState(null);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsDescription, setNewsDescription] = useState('');

  const handleFileChange = (e) => {
    setHighlightImg(e.target.files[0]);
  };

  const handleNewsFileChange = (e) => {
    setNewsImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('highlightImg', highlightImg); // Image for highlights
    formData.append('highlightTitle', highlightTitle); // Title for highlights

    try {
      const response = await axios.put('http://localhost:4000/news/api/highlights', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('Error uploading data:', error);
    }
  };

  const handleNewsSubmit = async (e) => {
    e.preventDefault();

    console.log('Submitting news:', { newsImg, newsTitle, newsDescription });

    const formData = new FormData();
    
    if (newsImg) {
      formData.append('img', newsImg);
    } else {
      console.log('newsImg is null or undefined');
    }
    
    formData.append('title', newsTitle);
    formData.append('description', newsDescription);

    try {
      const response = await axios.put('http://localhost:4000/news/api/news', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) { 
      console.error('Error uploading news data:', error);
    }
  };

  return (
    <div>
      {/* Existing Highlight Form */}
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

      {/* New News Form */}
      <form onSubmit={handleNewsSubmit}>
        <h3>Upload News Image, Title, and Description</h3>
        
        <input
          type="file"
          onChange={handleNewsFileChange}
          accept="image/*"
          required
        />
        
        <input
          type="text"
          placeholder="News Title"
          value={newsTitle}
          onChange={(e) => setNewsTitle(e.target.value)}
          required
        />
        
        <textarea
          placeholder="News Description"
          value={newsDescription}
          onChange={(e) => setNewsDescription(e.target.value)}
          required
        />
        
        <button type="submit">Submit News</button>
      </form> 
    </div>
  );
};

export default UploadForms;
