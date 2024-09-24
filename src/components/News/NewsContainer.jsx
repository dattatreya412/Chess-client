import React from "react";

const NewsContainer = ({ latestNews }) => {
  // Ensure latestNews is an array, even if we receive a single object
  const newsArray = Array.isArray(latestNews) ? latestNews : [latestNews];
  let updatedNews = []
  if (newsArray && newsArray.length > 0 && newsArray[0].news && newsArray[0].news.length > 0) {
    updatedNews = newsArray[0].news[0].__parentArray || [];
  } else {
    updatedNews = [];
  }
  return (
    <section className="h-60 w-10/12 ">
      <ul className="h-full w-full ">
        {updatedNews && updatedNews.length > 0 && updatedNews.map((newsItem, index) => {
          // Extract the actual news item from the structure
          const element = newsItem && (newsItem._doc || newsItem);
          
          if (!element) return null;

          return (
            <li key={index} className="w-full h-full bg-black bg-opacity-80 flex justify-center items-center gap-10 my-5 px-10 rounded-md text-white hover:bg-opacity-90 transition-all duration-300">
              <div className="w-1/3 h-40 bg-white bg-opacity-10 rounded-sm">
                {element.img && (
                  <img 
                    src={`http://localhost:4000/news/news/${element.img}`}
                    alt={element.title || 'News image'} 
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
              <div className="w-2/3 h-40 rounded-sm">
                <h1 className="w-full h-14 my-1 px-2 rounded-sm text-2xl font-bold flex items-center hover:bg-opacity-20 transition-all duration-300">{element.title || 'No title'}</h1>
                <p className="w-fit px-2 h-5 my-2  rounded-sm text-sm hover:bg-opacity-20 transition-all duration-300">
                  {element.date ? new Date(element.date).toLocaleDateString() : 'No date'}
                </p>
                <p className="w-full px-2 py-0.5 h-fit my-1 text-sm  rounded-sm overflow-hidden hover:bg-opacity-20 transition-all duration-300">
                  {(element.description || 'No description').slice(0, 200)} 
                  {element.description && element.description.length > 200 ? '...' : ''}
                </p>
              </div>
            </li>
          ); 
        })}
      </ul>
    </section>
  );
};

export default NewsContainer;
