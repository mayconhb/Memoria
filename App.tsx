import React from 'react';
import { VideoSection } from './components/VideoSection';

export default function App() {
  return (
    // Outer container: Centers the mobile view on desktop screens
    <div className="min-h-screen bg-gray-100 flex justify-center items-start sm:py-8 font-sans">
      
      {/* Mobile Container: Fixed width to match the image aspect ratio provided */}
      <div className="w-full max-w-[400px] bg-white min-h-screen sm:min-h-fit sm:h-auto shadow-2xl overflow-hidden flex flex-col">
        
        {/* Image provided by user replacing header and text */}
        {/* Using i.imgur.com/ID.png pattern to ensure the image loads correctly inside the tag */}
        <img 
          src="https://i.imgur.com/uFrDgOF.png" 
          alt="Conteúdo Principal" 
          className="w-full h-auto block"
        />

        {/* Main Content Area */}
        <main className="flex-1 bg-white">
          {/* Video Section Spacer */}
          <VideoSection />
        </main>
        
      </div>
    </div>
  );
}