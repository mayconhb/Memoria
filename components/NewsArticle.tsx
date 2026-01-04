import React from 'react';

export const NewsArticle: React.FC = () => {
  return (
    <article className="px-4 pt-4 pb-6">
      {/* Date */}
      <div className="flex justify-center mb-4">
        <span className="text-[11px] text-gray-500 uppercase tracking-wide font-sans">
          28 dic 2025
        </span>
      </div>

      {/* Headline */}
      <h2 className="font-serif text-[28px] leading-[1.15] font-bold text-news-black mb-4">
        <span className="inline-block bg-[#E5BE01] text-white font-serif font-bold text-sm px-1 py-0.5 mr-2 align-middle rounded-[1px]">
          E
        </span>
        La gran mentira sobre la memoria: por qué el Alzheimer sigue avanzando pese a décadas de medicamentos
      </h2>

      {/* Subtitle / Lead Paragraph */}
      <p className="font-serif text-[17px] leading-relaxed text-gray-600">
        Mientras la industria promete soluciones, los casos se multiplican. Un nuevo video expone una hipótesis inquietante: una toxina invisible presente en el aire, el agua y los alimentos podría estar robando recuerdos en silencio. Y revela por qué nadie habla de ello.
      </p>
    </article>
  );
};