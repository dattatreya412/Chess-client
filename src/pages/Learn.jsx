import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLessons } from '../store/lessonSlice';
import Header from '../components/Learn/Header';
import LessonsList from '../components/Learn/LessonsList';


const Learn = () => {
  const dispatch = useDispatch();
  const { lessons, status, error } = useSelector((state) => state.lessons);
  if(lessons.length > 0){
    console.log(lessons);
  }
  useEffect(() => {
    dispatch(fetchLessons());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ flexGrow: 1, overflowY: 'auto' }}>
        <LessonsList lessons={lessons} />
      </div>
    </div>
  );
};

export default Learn;