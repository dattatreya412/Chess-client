import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/News/Header";
import Headlines from "../components/News/Headlines";
import NewsContainer from "../components/News/NewsContainer";
import { fetchNews, fetchLatestNews } from "../store/userSlice"; 
import logo from '../assets/news-logo.png'

const News = () => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.user.news);
  const latestNews = useSelector((state) => state.user.latestNews);
  // console.log(news)
  // console.log("latestNews" + JSON.stringify(latestNews))
  useEffect(() => {
    dispatch(fetchNews());
    dispatch(fetchLatestNews());
  }, [dispatch]);
  return (
    <section className="w-full h-full overflow-y-auto hidden-scrollbar">
      <Header logo={logo} />
      <Headlines highlights={news} />
      {latestNews && <NewsContainer latestNews={latestNews} />}
    </section>
  );
};

export default News;
