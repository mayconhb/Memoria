import React, { useEffect } from 'react';

export const VideoSection: React.FC = () => {
  useEffect(() => {
    const scriptSrc = "https://scripts.converteai.net/8be91a4f-8063-443e-ad7c-0bc55451c92d/players/6959b2bbc9de5690088a914b/v4/player.js";
    
    // Verifica se o script já existe para evitar duplicação
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const s = document.createElement("script");
      s.src = scriptSrc;
      s.async = true;
      document.head.appendChild(s);
    }
  }, []);

  return (
    <div className="w-full bg-white pt-2 pb-6">
      <div className="px-4 mb-3">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Video Destacado
        </span>
      </div>
      
      {/* Vturb Player */}
      <div className="w-full">
        {/* @ts-ignore - Ignorando erro de tipo para web component customizado */}
        <vturb-smartplayer
          id="vid-6959b2bbc9de5690088a914b"
          style={{ display: 'block', margin: '0 auto', width: '100%', maxWidth: '400px' }}
        />
      </div>
    </div>
  );
};