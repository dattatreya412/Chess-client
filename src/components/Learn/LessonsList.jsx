import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LessonsList = ({ lessons }) => {
  const [hoveredLesson, setHoveredLesson] = useState(null);
  const username = useSelector(state => state.user.username)
  const navigate = useNavigate();

  const handleLessonClick = (lesson) => {
    navigate(`/${username}/learn/${lesson._id}`, { state: { lesson } });
  };

  return (
    <div className="lessons-list" style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: 'white'
    }}>
      {lessons.length > 0 && lessons.map((lesson) => (
        <div
          key={lesson._id}
          className="lesson-card"
          style={{
            display: 'flex',
            border: '1px solid #333',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: hoveredLesson === lesson._id ? '0 4px 8px rgba(255,255,255,0.1)' : 'none',
            transition: 'box-shadow 0.3s ease',
            cursor: 'pointer',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
          }}
          onMouseEnter={() => setHoveredLesson(lesson._id)}
          onMouseLeave={() => setHoveredLesson(null)}
          onClick={() => handleLessonClick(lesson)}
        >
          <img
            src={lesson.lessonImg}
            alt={lesson.lessonTitle}
            className="lesson-image"
            style={{
              width: '200px',
              height: '200px',
              objectFit: 'cover'
            }}
          />
          <div className="lesson-content" style={{ 
            padding: '15px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <h2 className="lesson-title" style={{
              fontSize: '1.5rem',
              marginBottom: '10px',
              color: 'white',
              fontWeight: 'bold',
              fontFamily: 'Georgia, serif'
            }}>
              {lesson.lessonTitle}
            </h2>
            <p className="lesson-description" style={{
              fontSize: '1rem',
              color: 'white',
              lineHeight: '1.4',
              fontFamily: 'Verdana, sans-serif'
            }}>
              {lesson.lessonContent.length > 300
                ? `${lesson.lessonContent.substring(0, 300)}...`
                : lesson.lessonContent}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LessonsList;