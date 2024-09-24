import React from "react";

const Headlines = ({ highlights }) => {
  if (!highlights) {
    return null; // or return a loading state or placeholder
  }

  const imageStyle = highlights.img
    ? { 
        backgroundImage: `url(data:image/jpeg;base64,${highlights.img})`,
        backgroundPosition: 'center top'
      }
    : {};

  return (
    <section className="w-10/12 mx-auto my-8">
      {highlights.img && (
        <div 
          className="h-[45vh] w-full bg-black bg-opacity-30 rounded-lg bg-cover shadow-lg transition-transform duration-300 hover:scale-102 relative overflow-hidden"
          style={imageStyle}
        >
          {highlights.title && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <h2 className="text-white text-2xl font-bold leading-tight line-clamp-2">
                {highlights.title}
              </h2>
            </div>
          )}
        </div>
      )}
      {!highlights.img && highlights.title && (
        <div className="h-[45vh] w-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 flex items-center justify-center">
          <h2 className="text-white text-3xl font-bold leading-tight text-center">
            {highlights.title}
          </h2>
        </div>
      )}
    </section>
  );
};

export default Headlines;
