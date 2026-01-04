import React from 'react';
import { Menu, User } from 'lucide-react';

export const NewsHeader: React.FC = () => {
  return (
    <header className="border-b border-gray-200 px-3 py-3 flex items-center justify-between sticky top-0 bg-white z-10 h-16">
      {/* Left: Menu Icon */}
      <div className="flex-shrink-0">
        <button className="p-1">
          <Menu className="w-7 h-7 text-news-black" strokeWidth={1.5} />
        </button>
      </div>

      {/* Center: Logo */}
      <div className="flex-grow text-center">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-news-black scale-y-90 transform">
          EL PAÍS
        </h1>
      </div>

      {/* Right: Subscribe Button & User Icon */}
      <div className="flex items-center space-x-3 flex-shrink-0">
        <button className="bg-news-yellow text-news-black text-[10px] font-bold px-2 py-1 tracking-wider uppercase rounded-sm hover:opacity-90 transition-opacity">
          Suscríbete
        </button>
        <button>
          <User className="w-5 h-5 text-news-black" strokeWidth={2} />
        </button>
      </div>
    </header>
  );
};