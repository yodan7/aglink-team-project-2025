import React from "react";

interface BookmarkItemProps {
  image: string;
  title: string;
  description: string;
}

export const BookmarkItem: React.FC<BookmarkItemProps> = ({ image, title, description }) => {
  return (
    <div className="bg-white/95 p-3 rounded-lg flex items-center space-x-4 shadow hover:shadow-md hover:bg-white transition-all duration-300 cursor-pointer">
      <img
        src={image}
        alt={title}
        className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0 object-cover"
      />
      <div className="flex-grow">
        <h3 className="font-bold text-gray-800 text-base sm:text-lg">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};