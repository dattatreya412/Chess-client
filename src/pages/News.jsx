import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/News/Header";
import Headlines from "../components/News/Headlines";
import NewsContainer from "../components/News/NewsContainer";

const News = () => {
  const [highlights, setHighlights] = useState({
    img: "",
    description: "",
  });
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("http://localhost:4000/news");
        setHighlights(data.highlights);
        setNews(data.news);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  return (
    <section className="w-full h-full overflow-y-auto hidden-scrollbar">
      <Header />
      <Headlines highlights={highlights} />
      {!loading && <NewsContainer news={news} />}
    </section>
  );
};

export default News;
