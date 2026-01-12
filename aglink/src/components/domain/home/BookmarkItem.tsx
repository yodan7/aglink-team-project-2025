import React from "react";
import Image from "next/image";

interface BookmarkItemProps {
  image: string;
  title: string;
  description: string;
}

export const BookmarkItem: React.FC<BookmarkItemProps> = ({ image, title, description }) => {
  return (
    <div className="bg-white/95 p-4 rounded-lg flex items-center space-x-4 shadow hover:shadow-md hover:bg-white transition-all duration-300 cursor-pointer">
      <div className="w-20 h-20 bg-gray-200 rounded-md flex-shrink-0 overflow-hidden relative">
        <Image src={image} alt={title} fill className="object-cover object-center" />
      </div>
      <div className="flex-grow">
        <h3 className="font-bold text-gray-800 text-lg sm:text-xl">{title}</h3>
        <p className="text-gray-600 text-base">{description}</p>
      </div>
    </div>
  );
};