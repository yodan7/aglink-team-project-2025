// aglink/src/components/domain/home/BookmarkItem.tsx
import React from "react";

interface BookmarkItemProps {
  image: string;
  title: string;
  description: string;
}

export const BookmarkItem: React.FC<BookmarkItemProps> = ({ image, title, description }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = 'https://placehold.co/80x80/ef4444/ffffff?text=Error';
  };

  return (
    <div className="flex items-center space-x-4 p-2 rounded-lg hover:bg-black/10 transition-colors">
      <img 
        src={image} 
        alt={title} 
        className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-300 rounded-md flex-shrink-0 object-cover border-2 border-white/50"
        onError={handleImageError}
      />
      <div className="flex-grow">
        <h3 className="font-bold text-white text-lg sm:text-xl">{title}</h3>
        <p className="text-white/90 text-base">{description}</p>
      </div>
    </div>
  );
};
